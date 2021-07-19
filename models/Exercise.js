const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  workout_type: {
    type: String,
    trim: true,
    required: "Enter a name for transaction"
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
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
