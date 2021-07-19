const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  resistance: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resistance"
    }
  ],
  cardio: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cardio"
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
