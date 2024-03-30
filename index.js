"use strict";

const PORT = 3001;

const { app } = require("./app");
// test deploy
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
