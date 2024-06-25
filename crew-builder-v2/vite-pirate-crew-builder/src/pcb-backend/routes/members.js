const express = require("express");
const router = express.Router();

let crew = require("../data/initial_team.json").members;

/* GET members */
router.get("/", function (req, res, _) {
  return res.status(200).send(crew);
});

/* GET member by id */
router.get("/:memberId", function (req, res, _) {
  const foundMember = crew.find(
    (user) => user.id === parseInt(req.params.memberId),
  );
  if (!foundMember) {
    return res.status(404).json({ message: "Member not found" });
  }
  return res.status(200).send(foundMember);
});

/* POST member */
router.post("/", function (req, res, _) {
  const newMember = { ...req.body };
  const MAX_CREW_SIZE = 6;
  if (crew.length < MAX_CREW_SIZE) {
    crew.push(newMember);
  } else {
    return res
      .status(403)
      .json({ message: `Cannot exceed max crew size of ${MAX_CREW_SIZE}` });
  }
  return res.status(201).json(newMember);
});

/* DELETE member by id */
router.delete("/:memberId", function (req, res, _) {
  const memberId = req.params.memberId;
  const initialLength = crew.length;

  crew = crew.filter((member) => member.memberId !== memberId);

  if (crew.length === initialLength) {
    return res.status(404).json({ message: "Member not found" });
  }

  return res.status(204).send();
});

router.patch("/:memberId", function (req, res, _) {
  const memberId = req.params.memberId;
  const memberIndex = crew.findIndex((member) => member.memberId === memberId);

  if (memberIndex === -1) {
    return res.status(404).json({ message: "Member not found" });
  }

  const member = crew[memberIndex];

  if (member.unitLevel < member.images.length) {
    member.unitLevel++;
    crew[memberIndex] = member;
    return res.status(200).json(member);
  }

  return res
    .status(400)
    .json({ message: `Pirate ${member.memberId} is already at MAX level` });
});

module.exports = router;
