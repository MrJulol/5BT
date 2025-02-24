const express = require("./$node_modules/express/index.js");
const fs = require("fs");

const app = express();
const port = 4000;

const logRequest = (req, res, next) => {
  const logMessage = `URL: ${req.url}\n`;
  fs.appendFile("requests.log", logMessage, (err) => {
    if (err) {
      console.error("Failed to log request:", err);
    }
  });
  next();
};

app.use(logRequest);

app.post("/left", (req, res) => {
  res.send("Logged left");
});

app.post("/right", (req, res) => {
  res.send("Logged right");
});

app.post("/front", (req, res) => {
  res.send("Logged front");
});

app.post("/back", (req, res) => {
  res.send("Logged back");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
