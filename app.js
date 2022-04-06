const express = require("express");
const app = express();
// this is to connect to the mongoDB, importing the key from the config folder
//PLEASE READ... you need to go to whatwg-url/lib/encoding.js and declare "var util= require('util');" and write "util.TextEncoder" and "util.TextDecoder"
// If this is not changed, it will cause error
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// ADD REQUIRED ROUTES - START
const users = require("./routes/api/users");
const children = require("./routes/api/children");
// ADD REQUIRED ROUTES - END

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// ADD BACKEND ROUTES - START
app.use("/api/users", users);
app.use("/api/children", children);
// ADD BACKEND ROUTES - END

const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});
// Please take a look at package.json as you read below descriptions
// At this point, when we make changes to the code, app.js does not recognize any changes made to the code
// To make the changes take place immediately, we are going to install nodemon
// npm install -D nodemon... this is just for dev-dependency because our code shouldn't change in production
// We also need to create scripts to run the app using nodemon
//? 'npm run server' will run app.js using nodemon
//? 'npm start' will run app.js using node in production


