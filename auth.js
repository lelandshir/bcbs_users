const axios = require("axios");
const bcrypt = require("bcrypt");
const UserSchema = require("./models/User");

const BASE_URL = "https://reqres.in/api";
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { error } = UserSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, email, password } = req.body;

    // Note: Hash the password
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Register the user using Reqres API
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      email,
      password,
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists using Reqres API
    const response = await axios.get(`${BASE_URL}/users?email=${email}`);

    const users = response.data.data;
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).send("Authentication failed");
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send("Authentication failed");
    }

    res.send("Authentication successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error authenticating user");
  }
};

const logout = (req, res) => {
  // TODO: Perform logout logic if needed
  res.send("Logout successful");
};

const ensureAuthenticated = (req, res, next) => {
  // TODO: Perform authentication logic if needed here
  next();
};

module.exports = {
  register,
  login,
  logout,
  ensureAuthenticated,
};
