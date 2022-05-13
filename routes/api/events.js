const express = require("express");
const router = express.Router();
const passport = require('passport');

const Event = require("../../models/Event");
const validateEventInput = require("../../validation/events");

router.get("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Event.find()
            .then(events => res.json(events))
            .catch(err => res.status(404).json({ eventsNotFound: "No events found" }))
    })

router.get('/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Event
            .findById(req.params.id)
            .then(event => res.json(event))
            .catch(err => res.status(404).json({ eventNotFound: 'Event with that ID does not exist' }));
    }
);

router.post("/new",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateEventInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newEvent = new Event({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            volunteers: req.body.volunteers,
            children: req.body.children,
            chef: req.body.children,
            description: req.body.description
        });
        
        newEvent
            .save()
            .then(event => res.json(event))
    }
);

router.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Event.findByIdAndDelete(req.params.id)
            .then(event => res.json("Event successfully deleted"))
            .catch(err => res.status(400).json("Event was not successfully deleted"))
    }
);

router.patch("/edit/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateEventInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        Event.findByIdAndUpdate(req.params.id, req.body, {new : true})
            .then(event => res.json(event))
    }
);


module.exports = router;