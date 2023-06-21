const axios = require("axios");
const BASE_URL = "https://reqres.in/api";

// Get all users
const getUsers = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
};

// Get a specific user by ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user");
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;

    const response = await axios.post(`${BASE_URL}/users`, {
      email,
      first_name,
      last_name,
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

// Update a user - not required but wrote this out
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name } = req.body;

    const response = await axios.put(`${BASE_URL}/users/${id}`, {
      email,
      first_name,
      last_name,
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${BASE_URL}/users/${id}`);
    res.send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the user");
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
