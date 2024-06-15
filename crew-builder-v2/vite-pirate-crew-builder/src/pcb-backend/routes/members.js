const express = require("express");
const router = express.Router();

let crew = require("../data/initial_team.json").members;

/* GET members */
router.get("/", function(req, res, next) {
  return res.status(200).send(crew);
});

/* GET member by id */
router.get("/:memberId", function(req, res, next) {
  const foundMember = crew.find((user) => user.id === parseInt(req.params.memberId));
  if (!foundMember) {
    return res.status(404).json({ message: "Member not found" });
  }
  return res.status(200).send(foundMember);
});

/* POST member */
router.post("/", function(req, res, next) {
  const newMember = { ...req.body };
  const MAX_CREW_SIZE = 6;
  if (crew.length < MAX_CREW_SIZE) {
    crew.push(newMember);
  } else {
    return res.status(403).json({ message: `Cannot exceed max crew size of ${MAX_CREW_SIZE}` });
  }
  return res.status(201).json(newMember);
});

/* DELETE member by id */
router.delete("/:memberId", function(req, res, next) {
  const memberId = req.params.memberId;
  const initialLength = crew.length;

  crew = crew.filter(member => member.memberId !== memberId);

  if (crew.length === initialLength) {
    return res.status(404).json({ message: "Member not found" });
  }

  return res.status(204).send();
});

module.exports = router;
