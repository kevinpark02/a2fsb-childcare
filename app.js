//! DECLARING CONSTANTS - START
    const express = require("express");
    // this gives us the app object that we can configure however we want
    const app = express();
//! DECLARINT CONSTANTS - END

//! DECLARING ROUTES - START
    // route used to listen for incoming request
        // Get request (root route)
        app.get("/", (req, res) => {
            res.send("Hello AppAcademy");
        });
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

