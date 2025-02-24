const express = require("express");
const jwt = require("jsonwebtoken");
const parser = require("body-parser");

const PORT = 3000;
const SECRET_KEY = "WhatTheFluff";
const app = express();

let numbers = [];

app.use(parser.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username != "admin" && password != "Kennwort0") {
    return res.status(400).send("Invalid Credentials");
  }
  const token = jwt.sign({ username, password }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(200).send({ token });
});

app.post("/create", authenticateToken, (req, res) => {
  const { rows } = req.body;
  if (!rows || rows <= 0)
    return res.status(400).json({ message: "Ungültige Anzahl von Zeilen" });
  numbers = Array.from({ length: rows }, () =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1)
  );
  return res.json(numbers);
});

app.post("/add", authenticateToken, (_, res) => {
  numbers.push(
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1)
  );
  return res.json(numbers);
});

app.get("/sum", authenticateToken, (_, res) => {
  const sum = numbers.flat().reduce((prev, curr) => prev + curr, 0);
  return res.json(sum);
});

app.delete("/delete", authenticateToken, (req, res) => {
  const { index } = req.body;

  if (!index || index > numbers.length - 1 || index < 0) {
    return res.status(400).json("Invalid Index");
  }

  numbers.splice(index, 1);
  return res.json(numbers);
});

app.post("/clear", authenticateToken, (_, res) => {
  numbers = [];
  return res.json(numbers);
});

app.get("/sort", authenticateToken, (req, res) => {
  const { order } = req.body;
  if (order != "asc" && order != "desc") return res.json("Invalid Order");

  numbers.forEach((row) => {
    row.sort((a, b) => (order === "asc" ? a - b : b - a));
  });
  return res.json(numbers);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
