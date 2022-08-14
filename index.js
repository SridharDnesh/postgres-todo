const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

// Create a todo
app.post("/addTodo", async (req, res) => {
  try {
    const { description = {} } = req.body;

    let queryRes = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.send(queryRes.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all todos
app.get("/getAllTodos", async (req, res) => {
  try {
    const queryRes = await pool.query("SELECT * FROM todo");
    res.send(queryRes?.rows);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// Get a todo
app.get("/getTodoById", async (req, res) => {
  try {
    const { todo_id } = req.body;
    const queryRes = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [todo_id]);
    res.send(queryRes?.rows);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// Update a todo
app.post("/updateTodo", async (req, res) => {
  try {
    const { todo_id, description } = req.body;

    debugger;
    const queryRes = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, todo_id]
    );
    res.send(queryRes?.rows);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// Delete a todo
app.delete("/deleteTodo", async (req, res) => {
  try {
    const { todo_id } = req.body;
    const queryRes = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [todo_id]
    );
    res.send(queryRes?.rows);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
