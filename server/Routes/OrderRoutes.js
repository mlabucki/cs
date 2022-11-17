const express = require("express");
// const asyncHandler = require("express-async-handler");
const Order = require("../Models/OrderModel.js");
const protect = require("../Middleware/AuthMiddleware.js");

const orderRouter = express.Router();

const asyncHandler = (fn) =>
  async function asyncUtilWrap(req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

// create order
orderRouter.post("/", protect, async (req, res, next) => {
  try {
    const { orderItems, collectionDetails } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No items");
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        orderDetails: collectionDetails,
      });

      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  } catch (error) {
    next(error);
  }
});

//user logins orders
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(orders);
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
