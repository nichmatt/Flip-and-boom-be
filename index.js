const express = require("express");
const PORT = 3001;
const cors = require("cors");
const app = express();
const router = require("./routers");
const { errorHandler } = require("./middlewares");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// pool.connect((err) => {
//   if (err) throw err;
//   console.log("Connect to PostgreSql succesfully");
// });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
// check lagi
