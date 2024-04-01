const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["teacher", "supervisor", "admin"],
    default: "teacher",
  },
  image: { type: String, required: false },
});

module.exports = mongoose.model("Teacher", schema);
