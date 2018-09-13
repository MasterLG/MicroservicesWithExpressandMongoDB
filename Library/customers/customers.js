const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb://xxx:xxx@ds249092.mlab.com:49092/customersservice",
  () => {
    console.log("Database connected - Customers Service");
  }
);
//Load out model
require("./Customer");
const Customer = mongoose.model("Customer");

app.post("/customer", (req, res) => {
  console.log(req.body);
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  };
  var customer = new Customer(newCustomer);
  customer
    .save()
    .then(() => {
      console.log("New customer created!");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
  res.send("A new customer created succesfully.");
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then(customers => {
      res.json(customers);
    })
    .catch(
      (err = {
        if(err) {
          throw err;
        }
      })
    );
});

app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then(customer => {
      if (customer) {
        //if book exists
        res.json(customer); //return data
      } else {
        res.send("Invalid ID");
        //res.sendStatus(404); //else return 404
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/customer/:id", (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("Customer deleted with success!");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.listen(5555, () => {
  console.log("Up and running - Customers Service");
});
