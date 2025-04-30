const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config({ path: __dirname + '/.env' });


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = app;
