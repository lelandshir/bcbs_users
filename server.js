require("dotenv").config();
const express = require("express");
const session = require("express-session");
const userController = require("./controllers/users.js");
const auth = require("./auth");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Registration endpoint
app.post("/register", auth.register);

// Login endpoint
app.post("/login", auth.login);

// Logout endpoint
app.get("/logout", auth.logout);

// Note: Protected route
app.get("/profile", auth.ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

// User CRUD routes
app.get("/users/:id", userController.getUser);
app.get("/users", userController.getUsers);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.post("/users", userController.createUser);

// Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
