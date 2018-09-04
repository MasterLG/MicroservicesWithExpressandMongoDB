//Load express
const express = require("express");
const app = express();
//Load mongoosee
const mongoose = require("mongoose");
//Connect
mongoose.connect(
  "mongodb://xxx:xxx@ds245022.mlab.com:45022/booksservice",
  () => {
    console.log("DB Connected!");
  }
);
app.get("/", (req, res) => {
  res.send("This is our main endpoint!This is the book service.");
});

//Open express server
app.listen(4545, () => {
  console.log("Up and Running! -- This is our Books Service");
});
