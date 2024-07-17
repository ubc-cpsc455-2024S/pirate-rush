const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const playersRouter = require("../routes/playersRoute");

const { db } = require("../db");

jest.mock("../db", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
  },
}));

const app = express();
app.use(bodyParser.json());
app.use("/players", playersRouter);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /players/:playerId", () => {
  it("should return the player with the given ID", async () => {
    const playerId = "123";
    const mockPlayer = { playerId, name: "Luffy", berries: 100 };

    db.collection().findOne.mockResolvedValueOnce(mockPlayer);

    const response = await request(app).get(`/players/${playerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPlayer);
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId });
  });

  it("should return 404 if the player is not found", async () => {
    const playerId = "123";

    db.collection().findOne.mockResolvedValueOnce(null);

    const response = await request(app).get(`/players/${playerId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: `Player with id: ${playerId} not found` });
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId });
  });

  it("should return 500 if there is a server error", async () => {
    const playerId = "123";

    db.collection().findOne.mockRejectedValueOnce(new Error("Server error"));

    const response = await request(app).get(`/players/${playerId}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Server error" });
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId });
  });
});

describe("PATCH /players/:playerId/berries", () => {
  it("should subtract berries from the player's account", async () => {
    const playerId = "123";
    const initialBerries = 100;
    const amountToSubtract = -20;
    const newBerries = initialBerries + amountToSubtract;

    db.collection().findOne.mockResolvedValueOnce({
      playerId,
      berries: initialBerries,
    });
    db.collection().updateOne.mockResolvedValueOnce({ modifiedCount: 1 });

    const response = await request(app)
      .patch(`/players/${playerId}/berries`)
      .send({ amount: amountToSubtract });

    expect(response.status).toBe(200);
    expect(response.body).toBe(newBerries);
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId });
    expect(db.collection().updateOne).toHaveBeenCalledWith(
      { playerId },
      { $set: { berries: newBerries } },
    );
  });

  it("should add berries to the player's account", async () => {
    const playerId = "123";
    const initialBerries = 100;
    const amountToAdd = 20;
    const newBerries = initialBerries + amountToAdd;

    db.collection().findOne.mockResolvedValueOnce({
      playerId,
      berries: initialBerries,
    });
    db.collection().updateOne.mockResolvedValueOnce({ modifiedCount: 1 });

    const response = await request(app)
      .patch(`/players/${playerId}/berries`)
      .send({ amount: amountToAdd });

    expect(response.status).toBe(200);
    expect(response.body).toBe(newBerries);
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId });
    expect(db.collection().updateOne).toHaveBeenCalledWith(
      { playerId },
      { $set: { berries: newBerries } },
    );
  });

  it("should return 404 if the player is not found", async () => {
    const playerId = "123";

    db.collection().findOne.mockResolvedValueOnce(null);

    const response = await request(app)
      .patch(`/players/${playerId}/berries`)
      .send({ amount: 20 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: `Player with id: ${playerId} not found` });
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId });
    expect(db.collection().updateOne).not.toHaveBeenCalled();
  });

  it("should return 400 if the amount is not a number", async () => {
    const playerId = "123";
    const initialBerries = 100;

    db.collection().findOne.mockResolvedValueOnce({
      playerId,
      berries: initialBerries,
    });

    const response = await request(app)
      .patch(`/players/${playerId}/berries`)
      .send({ amount: "not_a_number" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid amount" });
    expect(db.collection().findOne).not.toHaveBeenCalled();
    expect(db.collection().updateOne).not.toHaveBeenCalled();
  });

  it("should return 500 if there is a server error", async () => {
    const playerId = "123";
    const amountToAdd = 20;

    db.collection().findOne.mockResolvedValueOnce({
      playerId,
      berries: 100,
    });
    db.collection().updateOne.mockRejectedValueOnce(new Error("Server error"));

    const response = await request(app)
      .patch(`/players/${playerId}/berries`)
      .send({ amount: amountToAdd });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Server error" });
    expect(db.collection().findOne).toHaveBeenCalledWith({ playerId });
    expect(db.collection().updateOne).toHaveBeenCalledWith(
      { playerId },
      { $set: { berries: 120 } },
    );
  });
});
