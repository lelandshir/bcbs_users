require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const auth = require("./auth");
const userController = require("./controllers/users");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// User Controller Routes
app.use("/users", userController);

// Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
