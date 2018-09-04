//Load express
const express = require("express");
const app = express();
const bodyParser=require("body-parser");
//configure bodyParser.
app.use(bodyParser.json());
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

//Create func
app.post("/book",(req,res)=>{
//This is our create func
  console.log(req.body);
  res.send("Testing our book route!");
});

//Open express server
app.listen(4545, () => {
  console.log("Up and Running! -- This is our Books Service");
});
