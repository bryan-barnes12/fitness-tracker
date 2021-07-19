const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],
  day: {
    type: Date,
    default: Date.now
  },
  totalDuration: Number
});

workoutSchema.methods.calculateTotalDuration = function() {
  const durations = this.exercises.map(el => el.duration);
  this.totalDuration = durations.reduce((a, b) => a + b);
  return this.totalDuration;
};


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
