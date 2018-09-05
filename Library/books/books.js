//Load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: false }));//if you get error gettting req.body open comment
//configure bodyParser.
app.use(bodyParser.json());
//Load mongoosee
const mongoose = require("mongoose");
//import Book model
require("./Book");
const Book = mongoose.model("Book");

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
app.post("/book", (req, res) => {
  //This is our create func
  console.log(req.body); //For Testing Purposes

  //res.send("Testing our book route!"); //For Testing Purposes
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  };
  //Create a new Book with above req parameters
  var book = new Book(newBook);
  book
    .save()
    .then(() => {
      console.log("New book created!");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
  res.send("A new book is created with success!");
});

app.get("/books", (req, res) => {
  Book.find()
    .then(books => {
      //console.log(books);//For Testing Purposes
      res.json(books);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (book) {
        //if book exists
        res.json(book); //return data
      } else {
        res.sendStatus(404); //else return 404
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

//Open express server
app.listen(4545, () => {
  console.log("Up and Running! -- This is our Books Service");
});
