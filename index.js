"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routers");
const { errorHandler } = require("./middlewares");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect((err) => {
  if (err) throw er;
  console.log("Connect to PostgreSql succesfully");
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

module.exports = { app };