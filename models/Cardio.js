const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
  type: {
    type: String,
    required: "Enter an name"
  },
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
});

const Cardio = mongoose.model("Cardio", cardioSchema);

module.exports = Cardio;
