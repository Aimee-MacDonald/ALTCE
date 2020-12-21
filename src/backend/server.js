require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>ALTCE</h1>");
});

app.listen(PORT, () => console.log(`Server Starting on Port: ${PORT}`));