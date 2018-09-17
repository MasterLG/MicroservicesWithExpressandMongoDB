const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");

app.use(bodyParser.json());
mongoose.connect(
  "mongodb://xxx:xxx@ds157422.mlab.com:57422/ordersservice",
  () => {
    console.log("Database connected - Orders");
  }
);
//Model is loaded
require("./Order");
const Order = mongoose.model("Order");
//Will Create a new order
app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    InitialDate: req.body.InitialDate,
    DeliveryDate: req.body.DeliveryDate
  };

  var order = new Order(newOrder);
  order
    .save()
    .then(() => {
      //console.log("Order created successfully.");
      res.send("Order created successfully.");
    })
    .catch(err => {
      throw err;
    });
});

app.get("/orders", (req, res) => {
  Order.find()
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id).then(order => {
    if (order) {
      axios
        .get("http://localhost:5555/customer/" + order.CustomerID)
        .then(response => {
          //console.log(response);
          var orderObject = { customerName: response.data.name, bookTitle: "" };
          axios
            .get("http://localhost:4545/book/" + order.BookID)
            .then(response => {
              orderObject.bookTitle = response.data.title;
              res.json(orderObject);
            });
        });
    } else {
      res.send("Invalid Order!");
    }
  });
});

app.listen(7777, () => {
  console.log("Up and Running - Orders service");
});
