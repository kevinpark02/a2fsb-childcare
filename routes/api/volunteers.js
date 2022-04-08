const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateVolunteerInput = require('../../validation/volunteers');
const Volunteer = require('../../models/Volunteer');

// RETRIEVE ALL VOLUNTEERS
router.get("/", (req, res) => {
    Volunteer
        .find()
        .sort({ date: -1 })
        .then(volunteers => res.json(volunteers))
        .catch(err => res.status(400).json(err))
});

// RETRIEVE ONE VOLUNTEER BY ID
router.get('/:id', (req, res) => {
    Volunteer
        .findById(req.params.id)
        .then(volunteer => res.json(volunteer))
        .catch(err => res.status(404).json(err))
});

// CREATE NEW VOLUNTEEER
router.post('/new', (req, res) => {
    const { errors, isValid } = validateVolunteerInput(req.body)
    const newVolunteer = new Volunteer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email
    })

    if(!isValid) {
        return res.status(400).json(errors);
    };

    newVolunteer.save()
        .then(volunteer => res.json(volunteer))
});