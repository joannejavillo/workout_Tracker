const router = require("express").Router();
const path = require("path");
const workOut = require("../models/workout.js");

router.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/exercise", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/stats", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/workouts", (req, res) => {
    workOut.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.post("/api/workout", ({ body }, res) => {
    workOut.create(body)
        .then(dbworkOut => {
            res.json(dbworkOut);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post
module.exports = router;