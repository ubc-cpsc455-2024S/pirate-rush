const express = require("express");
const router = express.Router();
const { db } = require("../db");

const PLAYERS_COLL = "players";

/* GET player by id */
router.get("/:playerId", async (req, res) => {
    const playerId = req.params.playerId;
    try {
        const player = await db
            .collection(PLAYERS_COLL)
            .find({ playerId: playerId })
            .toArray();

        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: `Player with id: ${playerId} not found` });
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

/* PATCH player berries by id. { body.amount } has the amount to update berries by */
router.patch("/:playerId/berries", async (req, res) => {
    const playerId = req.params.playerId;
    const amount = parseInt(req.body.amount);

    const player = await db
        .collection(PLAYERS_COLL)
        .findOne({ playerId: playerId });

    if (!player) {
        return res.status(404).json({ error: "Player not found" });
    }

    const newBerries = player.berries - amount;

    await db
        .collection(PLAYERS_COLL)
        .updateOne(
        { playerId: playerId },
        { $set: { berries: newBerries } },
    );

    return res.status(200).json(newBerries);
});


module.exports = router;
