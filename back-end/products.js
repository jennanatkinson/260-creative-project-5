const express = require("express");
const mongoose = require('mongoose');
//const argon2 = require("argon2"); //this is for salting passwords

const router = express.Router();

// Create a scheme for products
const productSchema = new mongoose.Schema({
  /*id: Number, //Do I need this, or is the given id fine?*/
  name: String,
  price: String,
  image: String,
  recipe: String,
  attributes: {
    dairyFree: Boolean,
    nutFree: Boolean,
    vegan: Boolean
  },
  favorite: Boolean
});

// Create a model for products
const Product = mongoose.model('Product', productSchema);

/* API Endpoints */

/***Create a new product*/
router.post('/', async (req, res) => {
  const product = new Product({
  name: req.body.name,
  price: req.body.price,
  image: req.body.image,
  recipe: req.body.recipe,
  attributes: {
    dairyFree: req.body.dairyFree,
    nutFree: req.body.nutFree,
    vegan: req.body.vegan
    },
  favorite: false
  });
  try {
    await product.save();
    res.send({product:product});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/***Returns all products*/
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    res.send({products: products});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/***Deletes all the products, just in case I need to clear them*/
router.delete('/', async (req, res) => {
  try {
    await Product.deleteMany();

    /*Removes all the user's favorites*/
    /*let users = await User.find();
    users.forEach(function(user) {
      user.favoriteProducts = [];
    });*/
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/***Deletes one product*/
router.delete('/:productID', async (req, res) => {
  try {
    await Product.deleteOne({
      _id: req.params.productID
    });

    /*Deletes the product from anyone's favorites*/
    /*let users = await User.find();
    for(let i = 0; i < users.length; i++) {
      for (let j = 0; j < users[i].favoriteProducts.length; j++) {
        users[i].favoriteProducts.splice(i,1);
        await users[i].save();
      }
    }*/
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Product
};