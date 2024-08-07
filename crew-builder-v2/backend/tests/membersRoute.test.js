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
app.use('/members', membersRouter)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('GET /members', () => {
  it('should return all members', async () => {
    const mockMembers = [
      { memberId: '1', name: 'Luffy' },
      { memberId: '2', name: 'Zoro' },
    ]

    db.collection().toArray.mockResolvedValueOnce(mockMembers)

    const response = await request(app).get('/members')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockMembers)
    expect(db.collection().find).toHaveBeenCalledWith({})
    expect(db.collection().toArray).toHaveBeenCalled()
  })

  it('should return 404 if no members are found', async () => {
    db.collection().toArray.mockResolvedValueOnce([])

    const response = await request(app).get('/members')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'No members found' })
    expect(db.collection().find).toHaveBeenCalledWith({})
    expect(db.collection().toArray).toHaveBeenCalled()
  })

  it('should return 500 if there is a server error', async () => {
    db.collection().toArray.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).get('/members')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error' })
    expect(db.collection().find).toHaveBeenCalledWith({})
    expect(db.collection().toArray).toHaveBeenCalled()
  })
})

describe('GET /members/:memberId', () => {
  it('should return the member with the given ID', async () => {
    const memberId = '123'
    const mockMember = { memberId, name: 'Luffy', unitLevel: 3 }

    db.collection().findOne.mockResolvedValueOnce(mockMember)

    const response = await request(app).get(`/members/${memberId}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockMember)
    expect(db.collection().findOne).toHaveBeenCalledWith({ memberId })
  })

  it('should return 404 if the member is not found', async () => {
    const memberId = '123'

    db.collection().findOne.mockResolvedValueOnce(null)

    const response = await request(app).get(`/members/${memberId}`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: `Member with id: ${memberId} not found`,
    })
    expect(db.collection().findOne).toHaveBeenCalledWith({ memberId })
  })

  it('should return 500 if there is a server error', async () => {
    const memberId = '123'

    db.collection().findOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).get(`/members/${memberId}`)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ memberId })
  })
})

describe('POST /members', () => {
  it('should create a new member', async () => {
    const newMember = { memberId: '123', name: 'Zoro', unitLevel: 1 }
    const membersArr = []

    db.collection().toArray.mockResolvedValueOnce(membersArr)
    db.collection().insertOne.mockResolvedValueOnce({ insertedId: '123' })

    const response = await request(app).post('/members').send(newMember)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(newMember)
    expect(db.collection().find).toHaveBeenCalledWith({})
    expect(db.collection().toArray).toHaveBeenCalled()
    expect(db.collection().insertOne).toHaveBeenCalledWith(newMember)
  })

  it('should return 403 if max crew size is exceeded', async () => {
    const newMember = { memberId: '123', name: 'Zoro', unitLevel: 1 }
    const membersArr = new Array(MAX_CREW_SIZE).fill({})

    db.collection().toArray.mockResolvedValueOnce(membersArr)

    const response = await request(app).post('/members').send(newMember)

    expect(response.status).toBe(403)
    expect(response.body).toEqual({
      message: `Cannot exceed max crew size of ${MAX_CREW_SIZE}`,
    })
    expect(db.collection().find).toHaveBeenCalledWith({})
    expect(db.collection().toArray).toHaveBeenCalled()
    expect(db.collection().insertOne).not.toHaveBeenCalled()
  })

  it('should return 500 if there is a server error', async () => {
    const newMember = { memberId: '123', name: 'Zoro', unitLevel: 1 }

    db.collection().toArray.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).post('/members').send(newMember)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error' })
    expect(db.collection().find).toHaveBeenCalledWith({})
    expect(db.collection().toArray).toHaveBeenCalled()
    expect(db.collection().insertOne).not.toHaveBeenCalled()
  })
})

describe('DELETE /members/:memberId', () => {
  it('should delete the member with the given ID', async () => {
    const memberId = '123'

    db.collection().deleteOne.mockResolvedValueOnce({ deletedCount: 1 })

    const response = await request(app).delete(`/members/${memberId}`)

    expect(response.status).toBe(204)
    expect(db.collection().deleteOne).toHaveBeenCalledWith({ memberId })
  })

  it('should return 404 if the member to delete is not found', async () => {
    const memberId = '123'

    db.collection().deleteOne.mockResolvedValueOnce({ deletedCount: 0 })

    const response = await request(app).delete(`/members/${memberId}`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: `Member with id: ${memberId} not found`,
    })
    expect(db.collection().deleteOne).toHaveBeenCalledWith({ memberId })
  })

  it('should return 500 if there is a server error', async () => {
    const memberId = '123'

    db.collection().deleteOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).delete(`/members/${memberId}`)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error' })
    expect(db.collection().deleteOne).toHaveBeenCalledWith({ memberId })
  })
})

describe('PATCH /members/:memberId', () => {
  it("should upgrade the member's unit level", async () => {
    const memberId = '123'
    const initialUnitLevel = 1
    const mockMember = {
      memberId,
      unitLevel: initialUnitLevel,
      images: ['image1', 'image2', 'image3'],
    }

    db.collection().findOne.mockResolvedValueOnce(mockMember)
    db.collection().updateOne.mockResolvedValueOnce({ modifiedCount: 1 })

    const response = await request(app).patch(`/members/${memberId}`).send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      ...mockMember,
      unitLevel: initialUnitLevel + 1,
    })
    expect(db.collection().findOne).toHaveBeenCalledWith({ memberId })
    expect(db.collection().updateOne).toHaveBeenCalledWith({ memberId }, { $set: { unitLevel: initialUnitLevel + 1 } })
  })

  it('should return 400 if the member is already at MAX level', async () => {
    const memberId = '123'
    const maxUnitLevel = 3
    const mockMember = {
      memberId,
      unitLevel: maxUnitLevel,
      images: ['image1', 'image2', 'image3'],
    }

    db.collection().findOne.mockResolvedValueOnce(mockMember)

    const response = await request(app).patch(`/members/${memberId}`).send()

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: `Pirate ${memberId} is already at MAX level`,
    })
    expect(db.collection().findOne).toHaveBeenCalledWith({ memberId })
    expect(db.collection().updateOne).not.toHaveBeenCalled()
  })

  it('should return 404 if the member is not found', async () => {
    const memberId = '123'

    db.collection().findOne.mockResolvedValueOnce(null)

    const response = await request(app).patch(`/members/${memberId}`).send()

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Member not found' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ memberId })
    expect(db.collection().updateOne).not.toHaveBeenCalled()
  })

  it('should return 500 if there is a server error', async () => {
    const memberId = '123'

    db.collection().findOne.mockResolvedValueOnce({
      memberId,
      unitLevel: 1,
      images: ['image1', 'image2', 'image3'],
    })
    db.collection().updateOne.mockRejectedValueOnce(new Error('Server error'))

    const response = await request(app).patch(`/members/${memberId}`).send()

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Server error' })
    expect(db.collection().findOne).toHaveBeenCalledWith({ memberId })
    expect(db.collection().updateOne).toHaveBeenCalledWith({ memberId }, { $set: { unitLevel: 2 } })
  })
})
