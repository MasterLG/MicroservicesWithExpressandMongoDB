const mongoose = require("mongoose");

mongoose.model("Customer", {
  //Title, author,numberPages, publisher
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: false
  },
  address: {
    type: String,
    require: false
  }
});
