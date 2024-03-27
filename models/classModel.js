const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
  classId: { type: Number },
  name: { type: String, unique: true },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  children: [
    {
      type: Number,
      required: true,
      ref: "children",
    },
  ],
});
schema.plugin(AutoIncrement, { inc_field: "classId" });

module.exports = mongoose.model("classes", schema);
