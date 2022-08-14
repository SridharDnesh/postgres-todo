const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("./db");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

// Create a todo
app.post("/addTodo", async (req, res) => {
  try {
    const { description = {} } = req.body;
    
    const queryRes = await knex("todo").insert({ description }).returning("*");

    res.send(queryRes);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all todos
app.get("/getAllTodos", async (req, res) => {
  try {
    const queryRes = await knex("todo").select();

    res.send(queryRes);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// Get a todo
app.get("/getTodoById", async (req, res) => {
  try {
    const { todo_id } = req.body;

    const queryRes = await knex("todo").where("todo_id", todo_id).select();

    res.send(queryRes);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// Update a todo
app.post("/updateTodo", async (req, res) => {
  try {
    const { todo_id, description } = req.body;

    const queryRes = await knex("todo")
      .where({ todo_id })
      .update({ description }, "*");

    res.send(queryRes);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// Delete a todo
app.delete("/deleteTodo", async (req, res) => {
  try {
    const { todo_id } = req.body;

    const queryRes = await knex("todo").where({ todo_id }).delete(["todo_id"]);

    res.send(queryRes);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
