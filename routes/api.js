const router = require("express").Router();
const { Workout, Exercise } = require('../models')
const db = require('../models')

router.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({}).populate('exercises');
    res.json(workouts)
  } catch (err) {
    console.log(err)
  }
});

router.get('/api/exercise', async (req, res) => {
  try {
    const workouts = await Exercise.find({});
    res.json(workouts)
  } catch (err) {
    console.log(err)
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  const newWorkout = await Workout.create(body);
  res.json(newWorkout);
});


router.put("/api/workouts/:id", async (req, res) => {
  try {
    const newExercise = await Exercise.create(req.body);
    await Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: newExercise._id } }, { new: true });
    let updatedWorkout = await Workout.findOne({ _id: req.params.id }).populate('exercises');
    await updatedWorkout.calculateTotalDuration()
    updatedWorkout = await Workout.findOneAndUpdate({ _id: req.params.id }, { $set: { totalDuration: updatedWorkout.totalDuration } }, { new: true });
    if (updatedWorkout) {
      res.json(updatedWorkout);
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/api/workouts/range', async (req, res) => {
  try {
    const workouts = await Workout.find({}).limit(7).sort({ day: -1 }).populate('exercises');
    res.json(workouts)
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
