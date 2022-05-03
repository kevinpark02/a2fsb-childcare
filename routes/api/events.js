const express = require("express");
const router = express.Router();
const passport = require('passport');

const Event = require("../../models/Event");

router.get("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Event.find()
            .then(events => res.json(events))
            .catch(err => res.status(404).json({ eventsNotFound: "No events found" }))
    })

router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        
        const newEvent = new Event({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            eventName: req.body.eventName
        });
        
        newEvent
            .save()
            .then(event => res.json(event))
    })

module.exports = router;