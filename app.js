require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const appRoutes = require("./routers/approuters");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});
app.use(cors({ origin: "https://nusasthesis.com" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", appRoutes);

module.exports = app;
