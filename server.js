require("dotenv").config();
const express = require("express");
const session = require("express-session");
const userController = require("./controllers/users.js");
const auth = require("./auth");
const cors = require("cors");

const app = express();

// Middleware

// CORS Config
const allowedOrigins = ["http://localhost:3000"]; // Note: Frontend
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  })
);
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
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
