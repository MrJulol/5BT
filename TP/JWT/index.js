const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const SECRET_KEY = "your_secret_key";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://127.0.0.1:5500" }));

let users = [
  { id: 1, username: "admin", password: "admin123", role: "admin" }, // Admin dummy user
];

app.post("/register", (req, res) => {
  const { id, username, password, role } = req.body;

  if (!id || !username || !password || !role) {
    return res.status(400).json({ message: "Alle Felder sind erforderlich" });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Benutzername bereits vergeben" });
  }

  const newUser = { id, username, password, role };
  users.push(newUser);

  res.status(201).json({ message: "Benutzer erfolgreich registriert" });

  console.log(users);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" } // Token läuft in 1 Stunde ab
  );

  res.json({ message: "Login erfolgreich", token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Zugriff verweigert" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token ungültig" });
    }
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});
