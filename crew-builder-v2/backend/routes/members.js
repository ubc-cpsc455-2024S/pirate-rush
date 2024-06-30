const express = require("express");
const router = express.Router();
const { db } = require("../db");

const MAX_CREW_SIZE = 6;

const DEFAULT_TEAM_COLL = "default_team";
const USER_TEAM_COLL = "members";
const POOL_COLL = "pool";

router.get("/", async (req, res) => {
  try {
    const membersArr = await db
      .collection(USER_TEAM_COLL)
      .find({})
      .toArray();

    if (membersArr) {
      res.json(membersArr);
    } else {
      res.status(404).json({ message: "No members found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET member by id */
router.get("/:memberId", async (req, res, _) => {
  const memberId = parseInt(req.params.memberId);
  const foundMember = await db
    .collection(USER_TEAM_COLL)
    .findOne({ memberId: memberId });

  if (!foundMember) {
    return res.status(404).json({ message: "Member not found" });
  }
  return res.status(200).send(foundMember);
});

/* POST member */
router.post("/", async (req, res, _) => {
  const newMember = { ...req.body };
  const membersArr = await db.collection(USER_TEAM_COLL).find({}).toArray();

  if (membersArr.length < MAX_CREW_SIZE) {
    await db.collection(USER_TEAM_COLL).insertOne(newMember);
  } else {
    return res
      .status(403)
      .json({ message: `Cannot exceed max crew size of ${MAX_CREW_SIZE}` });
  }
  return res.status(201).json(newMember);
});

/* DELETE member by id */
router.delete("/:memberId", async (req, res, _) => {
  const memberId = req.params.memberId;

  await db.collection(USER_TEAM_COLL).deleteOne({ memberId: memberId });

  return res.status(204).send();
});

router.patch("/:memberId", async (req, res, _) => {
  const memberId = req.params.memberId;

  const member = await db
    .collection(USER_TEAM_COLL)
    .findOne({ memberId: memberId });
  console.log(member);
  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  if (member.unitLevel === member.images.length) {
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

  return res.status(200).json(member);
});

module.exports = router;
