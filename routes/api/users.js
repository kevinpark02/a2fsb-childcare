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

                    // This is just for testing, so we will comment it out, but leave it here for others to see
                    // newUser.save()
                    //        .then(user => res.send(user))
                    //        .catch(err => res.send(err));
                    
                    // generate salt. 
                    // First argument is the number of rounds to generate salt
                    // Second argument is the call back function that gets invoked when salt is generated
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                   .then((user) => res.json(user))
                                   .catch(err => console.log(err))
                        })
                    })
                }
            })
        });
    
    // User login route - to check email and password match up to user
        router.post('/login', (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            User.findOne({ email })
                .then(user => {
                    if(!user) {
                        return res.status(404).json({ email: "This user does not exist."})
                    }
                    bcrypt.compare(password, user.password)
                          .then(isMatch => {
                              if(isMatch) {
                                //   This will be commented out because we will be returning the jwt web token
                                    //   res.json({ msg: "Success!" });
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
                                    }
                                )
                              } else {
                                  return res.status(400).json({ password: "Incorrect password"});
                              }
                          })
                })
        });
//! ADD ROUTES - END

module.exports = router;
