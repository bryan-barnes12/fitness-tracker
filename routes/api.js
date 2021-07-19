const router = require("express").Router();
const Exercise = require("../models/Exercise.js");

router.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Exercise.find({});
    res.json(workouts)
  } catch (err) {
    console.log(err)
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  try {
    const newExercise = await Exercise.create(body);
    res.json(newExercise);
  } catch (err) {
    res.status(400).json(err);
  }
});

//---------------------------------------

router.post("/api/transaction/bulk", ({ body }, res) => {
  Transaction.insertMany(body)
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({})
    .sort({ date: -1 })
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
