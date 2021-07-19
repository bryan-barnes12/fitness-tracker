const router = require("express").Router();
const { Workout, Exercise, Resistance, Cardio } = require('../models')
const db = require('../models')

router.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({}).populate('exercises');
    console.log(workouts);
    res.json(workouts)
  } catch (err) {
    console.log(err)
  }
});

router.get('/api/exercise', async (req, res) => {
  try {
    const workouts = await Exercise.find({});
    console.log(workouts);
    res.json(workouts)
  } catch (err) {
    console.log(err)
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  const newWorkout = await Workout.create(body);
  res.json(newWorkout);
});


// THIS IS IMPORTANT FOR LATER...
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

// app.post("/submit", ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });


//---------------------------------------

// This is the beginnings of the put route. Find out how to handle the params in the url.
// router.put("/api/workouts", async ({ body }, res) => {
//   try {
//     const newWorkout = await Workout.create(body);
//     res.json(newWorkout);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
