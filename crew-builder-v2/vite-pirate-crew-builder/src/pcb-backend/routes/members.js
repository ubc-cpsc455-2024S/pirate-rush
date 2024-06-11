const express = require("express");
const router = express.Router();

const crew = require('../data/initial_team.json').members

/* GET members */
router.get("/", function (req, res, next) {
  return res.send(crew);
});

/* GET member by id */
router.get("/:memberId", function (req, res, next) {
  const foundMember = crew.find((user) => user.id === req.params.memberId);
  if (!foundMember) {
    return res.status(404).json({ message: "Member not found" });
  }
  return res.send(foundMember);
});

/* POST member */
router.post("/", function (req, res, next) {
  // Handle post request logic here
});

module.exports = router;
