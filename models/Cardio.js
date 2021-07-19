const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
  name: {
    type: String,
    required: "Enter an name"
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

const Cardio = mongoose.model("Cardio", cardioSchema);

module.exports = Cardio;
