const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../Models/ProductModel.js");
const protect = require("../Middleware/AuthMiddleware.js");

const productRoute = express.Router();

//all
productRoute.get(
  "/",

  asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
      title:{
        $regex:req.query.keyword,
        $options: "i"
      },
    }
    :{};
    const products = await Product.find({...keyword});
    res.json(products);
  })
);

//single
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product doesn not exist");
    }
  })
);

//product review
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.name,
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added!" });
    } else {
      res.status(404);
      throw new Error("Product does not exist");
    }
  })
);

module.exports = productRoute;
