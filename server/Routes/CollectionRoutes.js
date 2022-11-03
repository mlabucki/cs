// const express = require("express");
// const asyncHandler = require("express-async-handler");
// const Collection = require("../Models/CollectionModel");
// const protect = require("../Middleware/AuthMiddleware");



// const collectionRouter = express.Router();




// //log
// collectionRouter.post(
//   "/",
//   protect,
//   asyncHandler(async (req, res) => {
//     const { collectionItems, name, description, topic, tag,  } = req.body;
//   if(collectionItems && collectionItems.lenght === 0){
//     res.status(400)
//     throw new Error("No items")
//     return 
//   } else {
//     const collection = new Collection({
//         collectionItems, user:req.user._id, description, topic, tag,
//     })
//     const createCollection = await collection.save()
//     res.status(201).json(createCollection)
//   }
//   })
// );

// module.exports = collectionRouter;