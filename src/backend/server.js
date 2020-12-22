require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../frontend/src/views"));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.listen(PORT, () => console.log(`Server Starting on Port: ${PORT}`));