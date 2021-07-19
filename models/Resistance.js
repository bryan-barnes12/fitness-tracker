const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
  type: {
    type: String,
    required: "Enter an name"
  },
  name: {
    type: String,
    required: "Enter an name"
  },
  weight: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  duration: {
    type: Number,
    required: "Enter a duration value"
  },
});

const Resistance = mongoose.model("Resistance", resistanceSchema);

module.exports = Resistance;
