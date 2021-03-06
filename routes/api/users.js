//! DECLARING CONSTANTS - START
    // Router object is returned using express
        const express = require("express");
        const router = express.Router();
        const User = require("../../models/User");
    // Bcrypt
        const bcrypt = require('bcryptjs');
    // Jwt
        const keys = require("../../config/keys");
        const jwt = require("jsonwebtoken");
    // passport
        const passport = require("passport");
    // validation
        const validateRegisterInput = require("../../validation/register");
        const validateLoginInput = require("../../validation/login");
//! DECLARING CONSTANTS - END

//! ADD ROUTES - START
    // Private auth route
        router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
            res.json({ 
                id: req.user.id,
                email: req.user.email 
            });
        });

    // User signup route
        router.post("/register", (req, res) => {
            
            const { errors, isValid } = validateRegisterInput(req.body);

            if(!isValid) {
                return res.status(400).json(errors);
            }

            User.findOne({ email: req.body.email })
            .then(user => {
                if(user) {
                    errors.handle = "User already exists";
                    return res.status(400).json(errors);
                } else {
                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: req.body.password,
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                   .then(user => {
                                       const payload = { 
                                           id: user.id, 
                                           email: user.email 
                                        };
                                        jwt.sign(
                                            payload, 
                                            keys.secretOrKey,
                                            { expiresIn: 3600 },
                                            (err, token) => {
                                                res.json({
                                                    success: true,
                                                    token: "Bearer " + token
                                                });
                                            }
                                        );
                                   })
                                   .catch(err => console.log(err))
                        });
                    });
                }
            });
        });
    
    // User login route - to check email and password match up to user
        router.post('/login', (req, res) => {

            const { errors, isValid } = validateLoginInput(req.body);

            if(!isValid) {
                return res.status(400).json(errors);
            }

            const email = req.body.email;
            const password = req.body.password;

            User.findOne({ email })
                .then(user => {
                    if(!user) {
                        errors.handle = "This user does not exist";
                        return res.status(400).json(errors);
                    }
                    bcrypt.compare(password, user.password)
                          .then(isMatch => {
                              if(isMatch) {
                                const payload = {
                                    id: user.id,
                                    email: user.email
                                }
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        });
                                    });
                              } else {
                                  errors.password = "Incorrect password";
                                  return res.status(400).json(errors);
                              }
                          });
                });
        });
//! ADD ROUTES - END

module.exports = router;
