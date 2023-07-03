require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// GET-Endpunkt für /hello
app.get('/hello', (req, res) => {
  res.send('Hallo Welt');
});

// GET-Endpunkt für /hello/:Maitica
app.get('/hello/:Maitica', (req, res) => {
  const { Maitica } = req.params;
  res.send(`Hallo ${Maitica}`);
});

// Array für Benutzer
let users = [];

// GET-Endpunkt für /users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST-Endpunkt für /users
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send('Benutzer hinzugefügt');
});

// PUT-Endpunkt für /users/:id
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, ...updatedUser };
    }
    return user;
  });
  res.send('Benutzer aktualisiert');
});

// DELETE-Endpunkt für /users/:id
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send('Benutzer gelöscht');
});

// Starten Sie den Server
app.listen(port, () => {
  console.log(`Webserver läuft auf Port ${port}`);
});
