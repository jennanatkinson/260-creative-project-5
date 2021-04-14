const express = require("express");
const mongoose = require('mongoose');
//const argon2 = require("argon2"); // this is for salting passwords

const router = express.Router();
const products = require("./products.js");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
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

const User = mongoose.model('User', userSchema);

const Product = products.model;


/* API Endpoints */

/* All of these endpoints start with "/" here, but will be configured by the
   module that imports this one to use a complete path, such as "/api/users" */
  
  /***Create a new user*/
  router.post('/', async (req, res) => {
    const user = new User({
    name: req.body.name,
    email: req.body.email,
    allergyAttributes: {
      dairyFree: req.body.dairyFree,
      nutFree: req.body.nutFree,
      vegan: req.body.vegan
    },
    favoriteProducts: []
  });
  try {
    await user.save();
    res.send({user:user});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  });
  
  /***Gets all users*/
  router.get('/', async (req, res) => {
    try {
      let users = await User.find();
      res.send({users: users});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
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
  router.put('/:userID', async (req, res) => {
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
  router.put('/:userID/favorite/:productID', async (req, res) => {
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
  router.put('/:userID/unfavorite/:productID', async (req, res) => {
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
  router.delete('/:userID', async (req, res) => {
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
router.get('/:userID/all', async (req, res) => {
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
  router.get('/:userID/favorite', async (req, res) => {
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
  router.get('/:userID/allerginFriendly', async (req, res) => {
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
    model: User
  };