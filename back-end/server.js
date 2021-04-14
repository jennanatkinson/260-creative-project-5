const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
/*const { default: productData } = require('../front-end/src/product-data');*/

// connect to the database
mongoose.connect('mongodb://localhost:27017/bakery', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const products = require("./products.js");
app.use("/api/products", products.routes);


app.listen(3001, () => console.log('Server listening on port 3001!'));