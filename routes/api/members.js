const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");
const router = express.Router();

// Get all members
router.get("/", (req, res) => res.json(members));

// Get a member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `No member with ID of ${req.params.id} found`,
    });
  }
});

// Create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);

  res.json(members);
});

module.exports = router;
