const express = require("express");
const router = express.Router();
const { db } = require("../db");

const MAX_CREW_SIZE = 6;
const MAX_LEVEL = 3;

const USER_TEAM_COLL = "members";

/* GET all members */
router.get("/", async (req, res) => {
  try {
    const membersArr = await db.collection(USER_TEAM_COLL).find({}).toArray();

    if (membersArr.length > 0) {
      res.json(membersArr);
    } else {
      res.status(404).json({ message: "No members found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET member by id */
router.get("/:memberId", async (req, res) => {
  const memberId = req.params.memberId;
  try {
    const foundMember = await db
      .collection(USER_TEAM_COLL)
      .findOne({ memberId: memberId });

    if (!foundMember) {
      return res
        .status(404)
        .json({ message: `Member with id: ${memberId} not found` });
    }

    return res.status(200).json(foundMember);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

/* POST member */
router.post("/", async (req, res) => {
  const newMember = { ...req.body };
  try {
    const membersArr = await db.collection(USER_TEAM_COLL).find({}).toArray();

    if (membersArr.length < MAX_CREW_SIZE) {
      await db.collection(USER_TEAM_COLL).insertOne(newMember);
      return res.status(201).json(newMember);
    } else {
      return res
        .status(403)
        .json({ message: `Cannot exceed max crew size of ${MAX_CREW_SIZE}` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

/* DELETE member by id */
router.delete("/:memberId", async (req, res) => {
  const memberId = req.params.memberId;
  try {
    const result = await db
      .collection(USER_TEAM_COLL)
      .deleteOne({ memberId: memberId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `Member with id: ${memberId} not found` });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

/* PATCH member by id -> Upgrade */
router.patch("/:memberId", async (req, res) => {
  const memberId = req.params.memberId;
  try {
    const member = await db
      .collection(USER_TEAM_COLL)
      .findOne({ memberId: memberId });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.unitLevel >= MAX_LEVEL) {
      return res
        .status(400)
        .json({ message: `Pirate ${member.memberId} is already at MAX level` });
    }

    await db
      .collection(USER_TEAM_COLL)
      .updateOne(
        { memberId: memberId },
        { $set: { unitLevel: member.unitLevel + 1 } },
      );

    // Update the member object to reflect the new level
    member.unitLevel += 1;
    return res.status(200).json(member);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
