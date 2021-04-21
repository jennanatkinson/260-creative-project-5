const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const argon2 = require("argon2");

//const router = express.Router();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// connect to the database
mongoose.connect('mongodb://localhost:27017/bakery', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const products = require("./products.js");
app.use("/api/products", products.routes);


app.listen(3003, () => console.log('Server listening on port 3003!'));