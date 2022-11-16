const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../Models/OrderModel.js");
const protect = require("../Middleware/AuthMiddleware.js");

const orderRouter = express.Router();

// create order
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    
    const { orderItems, } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No items");
      return
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
      });
      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  })
);

//user logins order
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

//get order details by id
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json(createOrder);
      throw new Error("Order Not Found");
    }
  })
);

module.exports = orderRouter;
