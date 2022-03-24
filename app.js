//! DECLARING CONSTANTS - START
    // this gives us the app object that we can configure however we want
        const express = require("express");
        const app = express();
    // this is to connect to the mongoDB, importing the key from the config folder
        //PLEASE READ... you need to go to whatwg-url/lib/encoding.js and declare "var util= require('util');" and write "util.TextEncoder" and "util.TextDecoder"
        // If this is not changed, it will cause error
        const mongoose = require("mongoose");
        const db = require("./config/keys").mongoURI;
    // this gives us the objects from the routes
        const users = require("./routes/api/users");
        const children = require("./routes/api/children");
    // import user model
        const User = require("./models/User");
    // constants needed to interact with Postman
        const bodyParser = require('body-parser');
//! DECLARING CONSTANTS - END

//! CONNECTING TO DATABASE - START
    // Have mongoose connect to our database
    // First argument is the URI
    // Second argument is the configuration object
        mongoose
            .connect(db, { useNewUrlParser: true })
            // a promise is returned... letting you know that it's connected to the database
            .then(() => console.log("connected to mongoDB"))
            // if it fails, we want to know about that too
            .catch(err => console.log(err));
//! CONNECTING TO DATABASE - END

//! INTERACT WITH POSTMAN - START
    // app will respond to other software such as postman
        app.use(bodyParser.urlencoded({
            extended: false
        }));
    // telling the app to respond to json requests    
        app.use(bodyParser.json());
//! INTERACT WITH POSTMAN - END

//! DECLARING ROUTES - START
    // route used to listen for incoming request
        // Get request (root route)
        app.get("/", (req, res) => {
            const user = new User({
                firstName: "Kevin",
                lastName: "Park",
                gender: "Male",
                phone: "(310) 418 - 3016",
                email: "kevin.park@gpmail.org",
                password: "qwertyuiop",
                roles: ["administrator", "parent"]
            })
            user.save();
            res.send("Hello AppAcademy!");
        });
    // integrate api calls to app.js. Any request made using the api address, we will use whatever function we pass in the 2nd argument
        app.use("/api/users", users);
        app.use("/api/children", children);
//! DECLARING ROUTES - END

//! DEFINING PORT - START
    // Listen on a given port
        // if we are in the production, use the "PORT" varialbe, if not use port 5000
        const port = process.env.PORT || 5000;
    // Tell the app to listen and console log what port it is listening for the request
        // this is to see if the localhost displays the correct message
        app.listen(port, () => {console.log(`Listening on port ${port}`)});
    // Please take a look at package.json as you read below descriptions
        // At this point, when we make changes to the code, app.js does not recognize any changes made to the code
        // To make the changes take place immediately, we are going to install nodemon
        // npm install -D nodemon... this is just for dev-dependency because our code shouldn't change in production
        // We also need to create scripts to run the app using nodemon
            //? 'npm run server' will run app.js using nodemon
            //? 'npm start' will run app.js using node in production
//! DEFINING PORT - END

