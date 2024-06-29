const mongoose = require("mongoose");
const Member = require("./member");

const membersSchema = new mongoose.Schema({
  members: [Member.schema],
});

const Members = mongoose.model("Members", membersSchema);

module.exports = Members;
