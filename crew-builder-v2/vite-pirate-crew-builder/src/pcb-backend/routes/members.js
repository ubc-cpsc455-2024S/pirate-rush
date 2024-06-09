const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const crew = require("../data/initial_team.json").members;

/* GET members. */
router.get("/", function (req, res, next) {
  return res.json(crew);
});

/* GET member by id */
router.get("/:memberId", function (req, res, next) {
  const foundMember = crew.find((user) => user.id === req.params.memberId);
});

/* POST member */
router.post("/", function (req, res, next) {});

module.exports = router;
