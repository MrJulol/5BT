const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const SECRET_KEY = "geheimes_token";

let zahlenArray = [];

app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "Kennwort0") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    console.log("Login erfolgreich");
    console.log(token);
    res.json({ token });
  } else {
    res.status(403).json({ message: "Ungültige Anmeldedaten" });
  }
});

app.post("/create", authenticateToken, (req, res) => {
  const { rows } = req.body;
  if (!rows || rows <= 0)
    return res.status(400).json({ message: "Ungültige Anzahl von Zeilen" });

  zahlenArray = Array.from({ length: rows }, () =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1)
  );
  console.log("Array erstellt");
  console.log(zahlenArray);
  res.json({ zahlenArray });
});

app.post("/add", authenticateToken, (req, res) => {
  zahlenArray.push(
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1)
  );
  console.log("Zeile hinzugefügt");
  console.log(zahlenArray);
  res.json({ zahlenArray });
});

app.get("/sum", authenticateToken, (req, res) => {
  const sum = zahlenArray.flat().reduce((acc, num) => acc + num, 0);
  console.log("Summe berechnet");
  console.log(sum);
  res.json({ sum });
});

app.delete("/delete", authenticateToken, (req, res) => {
  const { index } = req.body;
  if (index < 0 || index >= zahlenArray.length)
    return res.status(400).json({ message: "Ungültiger Index" });

  zahlenArray.splice(index, 1);
  console.log("Zeile gelöscht");
  console.log(zahlenArray);
  res.json({ zahlenArray });
});

app.post("/clear", authenticateToken, (req, res) => {
  zahlenArray = [];
  console.log("Array geleert");
  console.log(zahlenArray);
  res.json({ message: "Array wurde geleert" });
});

app.get("/sort", authenticateToken, (req, res) => {
  const { order } = req.body;
  if (order !== "asc" && order !== "desc")
    return res.status(400).json({ message: "Ungültige Sortierreihenfolge" });
  zahlenArray.forEach((row) => {
    row.sort((a, b) => (order === "asc" ? a - b : b - a));
  });
  console.log("Array sortiert");
  console.log(zahlenArray);
  res.json({ zahlenArray });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
