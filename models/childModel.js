const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    street: { type: String },
    building: { type: String },
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: { type: Number },
  fullname: { type: String, required: true },
  age: { type: Number, min: 1, max: 7 },
  level: { type: String, enum: ["PreKG", "KG1", "KG2"], required: true },
  address: addressSchema,
});

schema.plugin(AutoIncrement);

module.exports = mongoose.model("children", schema);
