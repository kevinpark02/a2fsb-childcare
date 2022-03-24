//! DECLARING CONSTANTS - START
    // use this for passport that this is the strategy we want to use for handling json web tokens
        const JwtStrategy = require("passport-jwt").Strategy;
        const ExtractJwt = require('passport-jwt').ExtractJwt;
    // grab the user model
        const mongoose = require("mongoose");
        const User = mongoose.model("users");
        const keys = require("./keys");
//! DECLARING CONSTANTS - END

//! Passport Options - START
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken;
    options.secretOrKey =  keys.secretOrKey;
//! Passport Options - END

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};