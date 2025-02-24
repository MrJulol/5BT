const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const dataFilePath = "./data.json";

const readDataFromFile = () => {
  if (fs.existsSync(dataFilePath)) {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
  }
  return [];
};

const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get("/data", (_, res) => {
  const data = readDataFromFile();
  return res.send(data);
});

app.post("/data", (req, res) => {
  const newData = req.body;
  writeDataToFile(newData);
  return res.status(201).send(newData);
});

app.listen(3000, () => console.log("Running on 3000"));
