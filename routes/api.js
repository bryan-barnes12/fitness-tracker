const router = require("express").Router();
const { Workout, Resistance, Cardio } = require('../models')
const db = require('../models')

router.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({});
    res.json(workouts)
  } catch (err) {
    console.log(err)
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  const newWorkout = await db.Workout.create(body);
  res.json(newWorkout);
});


// THIS IS IMPORTANT FOR LATER...
router.put("/api/workouts/:id", async (req, res) => {
  try {
    if (req.body.type === 'resistance') {
      const newExercise = await Resistance.create(req.body);
      console.log(newExercise);
      await Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { resistance: newExercise._id } }, { new: true })
    }
    if (req.body.type === 'cardio') {
      const newExercise = await db.Cardio.create(req.body);
      await Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { cardio: newExercise._id } }, { new: true })
    }
    if (newExercise) {
      res.json(newExercise);
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
