//! DECLARING CONSTANTS - START
    // Router object is returned using express
        const express = require("express");
        const router = express.Router();
        const User = require("../../models/User");
//! DECLARING CONSTANTS - END

//! ADD ROUTES - START
    // Test route
        router.get("/test", (req, res) => {
            res.json({ msg: "This is the user route" });
        });
    // User signup route
        router.post("/register", (req, res) => {
            User.findOne({ email: req.body.email })
            .then(user => {
                if(user) {
                    return res.status(400).json({ email: "A user is already registered" })
                } else {
                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: req.body.password,
                        roles: req.body.roles
                    })

                    newUser.save()
                           .then(user => res.send(user))
                           .catch(err => res.send(err));
                }
            })
        })
//! ADD ROUTES - END

module.exports = router;
