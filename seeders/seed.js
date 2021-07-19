const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const workoutSeed = [
  {
    day: new Date(new Date().setDate(new Date().getDate() - 9)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 8)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 6)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
];

const exerciseSeed = [
  {
    type: 'resistance',
    name: 'Bicep Curl',
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4,
  },  
  {
    type: 'resistance',
    name: 'Lateral Pull',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },  
  {
    type: 'resistance',
    name: 'Push Press',
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4,
  },  
  {
    type: 'cardio',
    name: 'Running',
    duration: 25,
    distance: 4,
  },  
  {
    type: 'resistance',
    name: 'Bench Press',
    duration: 20,
    weight: 285,
    reps: 10,
    sets: 4,
  },  
  {
    type: 'resistance',
    name: 'Bench Press',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },  
  {
    type: 'resistance',
    name: 'Quad Press',
    duration: 30,
    weight: 300,
    reps: 10,
    sets: 4,
  },  
  {
    type: 'resistance',
    name: 'Bench Press',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },  
  {
    type: 'resistance',
    name: 'Military Press',
    duration: 20,
    weight: 300,
    reps: 10,
    sets: 4,
  },  
];  


async function seedDb(workoutSeed, exerciseSeed) {
  try {
    await db.Exercise.deleteMany({});
    await db.Workout.deleteMany({});
  
    const workouts = await db.Workout.collection.insertMany(workoutSeed);
    const workoutIds = [];
    for (const [key, value] of Object.entries(workouts.insertedIds)) {
      workoutIds.push(value);
    }
    const exercises = await db.Exercise.collection.insertMany(exerciseSeed);
    const exerciseIds = [];
    for (const [key, value] of Object.entries(exercises.insertedIds)) {
      exerciseIds.push(value);
    }
    if (workoutIds.length === exerciseIds.length) {
      for (let i = 0; i < workoutIds.length; i++) {
        await db.Workout.findOneAndUpdate({ _id: workoutIds[i] }, { $push: { exercises: exerciseIds[i] } }, { new: true });
        let updatedWorkout = await db.Workout.findOne({ _id: workoutIds[i] }).populate('exercises');
        await updatedWorkout.calculateTotalDuration()
        updatedWorkout = await db.Workout.findOneAndUpdate({ _id: workoutIds[i] }, { $set: { totalDuration: updatedWorkout.totalDuration } }, { new: true });
        }
    }
    console.log('Database seeded')
  } catch (err) {
    console.log(err);
  }
}

seedDb(workoutSeed, exerciseSeed)