const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
  distance: {
      type: Number,
  }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
