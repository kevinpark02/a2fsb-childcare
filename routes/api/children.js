 //! DECLARING CONSTANTS - START
    // Router object is returned using express
        const express = require("express");
        const router = express.Router();
    // Passport
        const passport = require('passport');
    // Validation
        const validateChildInput = require("../../validation/children");
    // Child model
        const Child = require("../../models/Child");

//! DECLARING CONSTANTS - END

//! ADD ROUTES - START
    // Test route - No need in the future
        // router.get("/test", (req, res) => {
        //     res.json({ msg: "This is the children route" });
        // });

    // Get route
        router.get("/", (req, res) => {
            Child
                .find()
                .sort({ birthday: 1 })
                .then(children => res.json(children))
                .catch(err => res.status(400).json(err))
        })

    // Post route
        router.post("/",
            passport.authenticate("jwt", { session: false }),
            (req, res) => {
                const { isValid, errors } = validateChildInput(req.body);
                if(!isValid) {
                    return res.status(400).json(errors);
                }

                const newChild = new Child({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    parents: req.body.parents,
                    photoId: req.body.photoId,
                    photoUrl: req.body.photoUrl
                });

                newChild
                    .save()
                    .then(child => res.json(child))

            }
        )

        router.delete("/:id",
            passport.authenticate("jwt", { session: false }),
            (req, res) => {
                Child.findByIdAndDelete(req.params.id)
                    .then((child) => res.json("Child successfully deleted"))
                    .catch(err => res.status(400).json("Child was not successfully deleted"))
            }
        )
        
        router.patch("/edit/:id",
            passport.authenticate("jwt", { session: false }), 
            (req, res) => {
                const { isValid, errors } = validateChildInput(req.body);

                if(!isValid) {
                    return res.status(400).json(errors);
                }

                Child.findByIdAndUpdate(req.params.id, req.body, {new : true})
                    .then(child => res.json(child))
            }
        )
        // router.patch("/edit/:id", (req, res) => {
        //     Child.findByIdAndUpdate(req.params.id, req.body, {new : true})
        //         .then(child => res.json(child))
        //     }
        // )
        
//! ADD ROUTES - END


module.exports = router;
