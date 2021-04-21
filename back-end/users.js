const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2"); // this is for salting passwords

const router = express.Router();
const products = require("./products.js");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  allergyAttributes: {
    dairyFree: Boolean,
    nutFree: Boolean,
    vegan: Boolean
  },
  favoriteProducts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  }],
});

// This is a hook that will be called before a user record is saved,
// allowing us to be sure to salt and hash the password first.
userSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password'))
    return next();

  try {
    // generate a hash. argon2 does the salting and hashing for us
    const hash = await argon2.hash(this.password);
    // override the plaintext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// This is a method that we can call on User objects to compare the hash of the
// password the browser sends with the has of the user's true password stored in
// the database.
userSchema.methods.comparePassword = async function(password) {
  try {
    // note that we supply the hash stored in the database (first argument) and
    // the plaintext password. argon2 will do the hashing and salting and
    // comparison for us.
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

// This is a method that will be called automatically any time we convert a user
// object to JSON. It deletes the password hash from the object. This ensures
// that we never send password hashes over our API, to avoid giving away
// anything to an attacker.
userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model('User', userSchema);

const Product = products.model;

/* Middleware */

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // set the user field in the request
    req.user = user;
  } catch (error) {
    // Return an error if user does not exist.
    return res.status(403).send({
      message: "not logged in"
    });
  }

  // if everything succeeds, move to the next middleware
  next();
};

/* API Endpoints */

/* All of these endpoints start with "/" here, but will be configured by the
   module that imports this one to use a complete path, such as "/api/users" */
  
  /***Create a new user*/
  router.post('/', async (req, res) => {
    // Make sure that the form coming from the browser includes a username and a
    // passsword, otherwise return an error. A 400 error means the request was
    // malformed.
    if (!req.body.username || !req.body.password)
    return res.status(400).send({
      message: "username and password are required"
    });

    try {
      //  Check to see if username already exists and if not send a 403 error. A 403
      // error means permission denied.
      const existingUser = await User.findOne({
        username: req.body.username
      });
      if (existingUser) {
        return res.status(403).send({
          message: "username already exists"
        });
      }

      const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      allergyAttributes: {
        dairyFree: req.body.dairyFree,
        nutFree: req.body.nutFree,
        vegan: req.body.vegan
      },
      favoriteProducts: []
    });
  
    await user.save();
    // set user session info
    req.session.userID = user._id;

    // send back a 200 OK response, along with the user that was created
    res.send({user:user});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  });

  /**Login User */
  router.post('/login', async (req, res) => {
    // Make sure that the form coming from the browser includes a username and a
    // password, otherwise return an error.
    if (!req.body.username || !req.body.password)
      return res.sendStatus(400);
  
    try {
      //  lookup user record
      const user = await User.findOne({
        username: req.body.username
      });
      // Return an error if user does not exist.
      if (!user)
        return res.status(403).send({
          message: "username or password is wrong"
        });
  
      // Return the SAME error if the password is wrong. This ensure we don't
      // leak any information about which users exist.
      if (!await user.comparePassword(req.body.password))
        return res.status(403).send({
          message: "username or password is wrong"
        });
  
      // set user session info
      req.session.userID = user._id;

      return res.send({
        user: user
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

    // get logged in user
  router.get('/', validUser, async (req, res) => {
    try {
      res.send({
        user: req.user
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // logout
  router.delete("/", validUser, async (req, res) => {
    try {
      req.session = null;
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  
  /***Gets all users*/
  /*router.get('/all', async (req, res) => {
    try {
      let users = await User.find();
      res.send({users: users});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });*/
  
  /***Gets one user*/
  /*router.get('/:userID', async (req, res) => {
    try {
      let user = await User.findOne({_id: req.params.userID});
      res.send({user: user});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });*/
  
  
  /***Update a user info*/
  router.put('/:userID', validUser, async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
      if (!user) {
        res.sendStatus(404);
        return;
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.allergyAttributes.dairyFree = req.body.dairyFree;
      user.allergyAttributes.nutFree = req.body.nutFree;
      user.allergyAttributes.vegan = req.body.vegan;
  
      user.save();
      res.send({user:user});
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
  });
  
  /***Update a user's favorites after favoriting*/
  router.put('/:userID/favorite/:productID', validUser, async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
    if (!user) {
      console.log("User not found");
      res.sendStatus(404);
      return;
    }
    let product = await Product.findOne({_id: req.params.productID});
    if (!product) {
      console.log("Product not found");
      res.sendStatus(404);
      return;
    }
    product.favorite = true;
    /*If the product isn't already in the user's favorites*/
    if (user.favoriteProducts.indexOf(product._id) === -1) {
      user.favoriteProducts.push(product);
    }
    await user.save();
    res.send({user:user});
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
  });
  
  /***Update a user's favorites after unfavoriting*/
  router.put('/:userID/unfavorite/:productID', validUser, async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
    if (!user) {
      console.log("User not found");
      res.sendStatus(404);
      return;
    }
    let product = await Product.findOne({_id: req.params.productID});
    if (!product) {
      console.log("Product not found");
      res.sendStatus(404);
      return;
    }
    let index = user.favoriteProducts.indexOf(product._id);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    user.favoriteProducts.splice(index,1);
    await user.save();
    res.send({user:user});
    return;
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
  });
  
  /***Deletes a single user*/
  router.delete('/:userID', validUser, async (req, res) => {
    try {
      await User.deleteOne({
        _id: req.params.userID
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  /***Returns all products with a user's favorites*/
router.get('/:userID/all', validUser, async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
    if (!user) {
      console.log("User not found");
      res.sendStatus(404);
      return;
    }
    let products = await Product.find();

    products.forEach(function(element) {
      if (user.favoriteProducts.some(product => product._id.equals(element._id))) {
        element.favorite = true;
      }
      else {
        element.favorite = false;
      }
    });
    res.send({products: products});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

  /***Get favorite products*/
  router.get('/:userID/favorite', validUser, async (req, res) => {
    try {
      let user = await User.findOne({_id: req.params.userID}).populate('favoriteProducts'); //this is now an array of products, not ids
      if (!user) {
          res.sendStatus(404);
          return;
      }
      user.favoriteProducts.forEach(product => {
        product.favorite = true;
      });
      res.send({products: user.favoriteProducts});
  
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  /***Get allergy friendly products*/
  router.get('/:userID/allerginFriendly', validUser, async (req, res) => {
    try {
      let user = await User.findOne({_id: req.params.userID});
      if (!user) {
          res.sendStatus(404);
          return;
      }
      let products = await Product.find();
  
      /*Filter through products and send the correct ones*/
      let allerginFriendlyProducts = products.filter(function (product) {
  
        /*If the person is dairy free but the product is not*/
        if (user.allergyAttributes.dairyFree && !product.attributes.dairyFree) {
          return false;
        }
        if (user.allergyAttributes.nutFree && !product.attributes.nutFree) {
          return false;
        }
        if (user.allergyAttributes.vegan && !product.attributes.vegan) {
          return false;
        }
        return true;
      });

      allerginFriendlyProducts.forEach(function(element) {
        if (user.favoriteProducts.some(product => product._id.equals(element._id))) {
          element.favorite = true;
        }
        else {
          element.favorite = false;
        }
      });
      
      res.send({products: allerginFriendlyProducts});
  
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  module.exports = {
    routes: router,
    model: User,
    valid: validUser
  };