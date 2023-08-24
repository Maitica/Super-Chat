require("dotenv").config();
const express = require("express");

let users = [];

const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  return res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.json(user);
});

app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  return res.status(201).send();
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingUser = users.find((user) => user.id === id);
  if (!existingUser) {
    return res.status(404).send("User not found");
  }
  users = users.filter((user) => user.id !== req.body.id);
  users.push(req.body);
  return res.status(200).send();
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((user) => user.id !== id);
  return res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
