const { Pool } = require("pg");

// Use DATABASE_URL from the environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true, // Enable this for production when Fly.io uses SSL
  },
});

// Get all users
const getUsers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error fetching user${error}`);
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
      [name, email]
    );
    res.status(201).send(`User added with ID: ${result.rows[0].id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
      name,
      email,
      id,
    ]);
    res.status(200).send(`User modified with ID: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
