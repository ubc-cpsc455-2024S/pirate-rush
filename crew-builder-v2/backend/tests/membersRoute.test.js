const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const membersRouter = require('../routes/membersRoute')

const { db } = require('../db')

const MAX_CREW_SIZE = 6

jest.mock('../db', () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    insertOne: jest.fn(),
    deleteOne: jest.fn(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn(),
  },
}))

const app = express()
app.use(bodyParser.json())
app.use('/players', membersRouter)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('GET /players/:playerId/members', () => {
  it('should return all members', async () => {
    const playerId = 'player1'
    const mockMembers = [
      { memberId: '1', name: 'Luffy' },
      { memberId: '2', name: 'Zoro' },
    ]
    const mockPlayer = { playerId, currentCrew: mockMembers }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)

    const response = await request(app).get(`/players/${playerId}/members`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockMembers)
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })

  it('should return 404 if no members are found', async () => {
    const playerId = 'player1'
    const mockPlayer = { playerId, currentCrew: [] }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)

    const response = await request(app).get(`/players/${playerId}/members`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'No members found' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })

  it('should return 500 if there is a server error', async () => {
    const playerId = 'player1'

    db.collection().findOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).get(`/players/${playerId}/members`)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error: Server error' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })
})

describe('GET /players/:playerId/members/:memberId', () => {
  it('should return the member with the given ID', async () => {
    const playerId = 'player1'
    const memberId = '123'
    const mockMember = { memberId, name: 'Luffy', unitLevel: 3 }
    const mockPlayer = {
      playerId,
      currentCrew: [mockMember],
    }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)

    const response = await request(app).get(`/players/${playerId}/members/${memberId}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockMember)
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })

  it('should return 404 if the member is not found', async () => {
    const playerId = 'player1'
    const memberId = '123'
    const mockPlayer = {
      playerId,
      currentCrew: [], // No members
    }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)

    const response = await request(app).get(`/players/${playerId}/members/${memberId}`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: `Member with id: ${memberId} not found` })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })

  it('should return 404 if the player is not found', async () => {
    const playerId = 'player1'
    const memberId = '123'

    db.collection().findOne.mockResolvedValueOnce(null) // No player found

    const response = await request(app).get(`/players/${playerId}/members/${memberId}`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: `Player with id: ${playerId} not found` })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })

  it('should return 500 if there is a server error', async () => {
    const playerId = 'player1'
    const memberId = '123'

    db.collection().findOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).get(`/players/${playerId}/members/${memberId}`)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error: Server error' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })
})

describe('POST /players/:playerId/members', () => {
  it('should create a new member', async () => {
    const playerId = 'player1'
    const newMemberName = 'Zoro'
    const mockPlayer = { playerId, currentCrew: [] }
    const mockPirate = { name: 'Zoro', unitLevel: 1 }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)
    db.collection().find().toArray.mockResolvedValueOnce([mockPirate])
    db.collection().updateOne.mockResolvedValueOnce({ modifiedCount: 1 })

    const response = await request(app).post(`/players/${playerId}/members`).send({ name: newMemberName })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining({ name: newMemberName }))
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
    expect(db.collection().find).toHaveBeenCalled()
    expect(db.collection().toArray).toHaveBeenCalled()
    expect(db.collection().updateOne).toHaveBeenCalledWith(
      { playerId },
      { $push: { currentCrew: expect.objectContaining({ name: newMemberName }) } }
    )
  })

  it('should return 403 if max crew size is exceeded', async () => {
    const playerId = 'player1'
    const newMemberName = 'Zoro'
    const mockPlayer = { playerId, currentCrew: new Array(MAX_CREW_SIZE).fill({}) }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)

    const response = await request(app).post(`/players/${playerId}/members`).send({ name: newMemberName })

    expect(response.status).toBe(403)
    expect(response.body).toEqual({ message: `Cannot exceed max crew size of ${MAX_CREW_SIZE}` })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })

  it('should return 500 if there is a server error', async () => {
    const playerId = 'player1'
    const newMemberName = 'Zoro'

    db.collection().findOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).post(`/players/${playerId}/members`).send({ name: newMemberName })

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error: Server error' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
  })
})

describe('DELETE /players/:playerId/members/:memberId', () => {
  it('should delete the member with the given ID', async () => {
    const playerId = 'player1'
    const memberId = '123'

    db.collection().updateOne.mockResolvedValueOnce({ modifiedCount: 1 })

    const response = await request(app).delete(`/players/${playerId}/members/${memberId}`)

    expect(response.status).toBe(204)
    expect(db.collection().updateOne).toHaveBeenCalledWith({ playerId }, { $pull: { currentCrew: { memberId } } })
  })

  it('should return 404 if the member to delete is not found', async () => {
    const playerId = 'player1'
    const memberId = '123'

    db.collection().updateOne.mockResolvedValueOnce({ modifiedCount: 0 })

    const response = await request(app).delete(`/players/${playerId}/members/${memberId}`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: `Member with id: ${memberId} not found` })
    expect(db.collection().updateOne).toHaveBeenCalledWith({ playerId }, { $pull: { currentCrew: { memberId } } })
  })

  it('should return 500 if there is a server error', async () => {
    const playerId = 'player1'
    const memberId = '123'

    db.collection().updateOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).delete(`/players/${playerId}/members/${memberId}`)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error: Server error' })
    expect(db.collection().updateOne).toHaveBeenCalledWith({ playerId }, { $pull: { currentCrew: { memberId } } })
  })
})

describe('PATCH /players/:playerId/members/:memberId', () => {
  it("should upgrade the member's unit level", async () => {
    const playerId = 'player1'
    const memberId = '123'
    const initialUnitLevel = 1
    const mockPlayer = {
      playerId,
      currentCrew: [{ memberId, unitLevel: initialUnitLevel, name: 'Luffy' }],
    }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)
    db.collection().updateOne.mockResolvedValueOnce({ modifiedCount: 1 })

    const response = await request(app).patch(`/players/${playerId}/members/${memberId}`).send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      memberId,
      unitLevel: initialUnitLevel + 1,
      name: 'Luffy',
    })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
    expect(db.collection().updateOne).toHaveBeenCalledWith(
      { playerId, 'currentCrew.memberId': memberId },
      { $set: { 'currentCrew.$.unitLevel': initialUnitLevel + 1 } }
    )
  })

  it('should return 400 if the member is already at MAX level', async () => {
    const playerId = 'player1'
    const memberId = '123'
    const maxUnitLevel = 3
    const mockPlayer = {
      playerId,
      currentCrew: [{ memberId, unitLevel: maxUnitLevel, name: 'Luffy' }],
    }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)

    const response = await request(app).patch(`/players/${playerId}/members/${memberId}`).send()

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: `Pirate ${memberId} is already at MAX level`,
    })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
    expect(db.collection().updateOne).not.toHaveBeenCalled()
  })

  it('should return 404 if the member is not found', async () => {
    const playerId = 'player1'
    const memberId = '123'
    const mockPlayer = { playerId, currentCrew: [] }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)

    const response = await request(app).patch(`/players/${playerId}/members/${memberId}`).send()

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Member not found' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
    expect(db.collection().updateOne).not.toHaveBeenCalled()
  })

  it('should return 500 if there is a server error', async () => {
    const playerId = 'player1'
    const memberId = '123'
    const mockPlayer = {
      playerId,
      currentCrew: [{ memberId, unitLevel: 1, name: 'Luffy' }],
    }

    db.collection().findOne.mockResolvedValueOnce(mockPlayer)
    db.collection().updateOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).patch(`/players/${playerId}/members/${memberId}`).send()

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error: Server error' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId })
    expect(db.collection().updateOne).toHaveBeenCalledWith(
      { playerId, 'currentCrew.memberId': memberId },
      { $set: { 'currentCrew.$.unitLevel': 2 } }
    )
  })
})
