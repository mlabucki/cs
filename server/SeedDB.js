const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("./Models/UserModel.js");
const Product = require("./Models/ProductModel.js");

const users = require("./data/Users.js");
const products = require("./data/Products.js");

const SeedsData = express.Router();

SeedsData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const seedUser = await User.insertMany(users);
    res.send({ seedUser });
  })
);

SeedsData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const seedProduct = await Product.insertMany(products);
    res.send({ seedProduct });
  })
);

module.exports = SeedsData;
