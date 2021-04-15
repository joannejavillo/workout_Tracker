const router = require("express").Router();
const workOut = require("../models/workout.js");

router.post("/api/workout", ({body}, res) => {
    workOut.create(body)
    .then(dbworkOut => {
        res.json(dbworkOut);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;