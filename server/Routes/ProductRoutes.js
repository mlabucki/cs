const express = require("express");
const asyncHandler = require("express-async-handler");
const protect = require("../Middleware/AuthMiddleware.js");

const Product = require("../Models/ProductModel.js");

const productRoute = express.Router();

//all
productRoute.get("/", asyncHandler(
    async(req,res)=>{
        const products = await Product.find({})
        res.json(products)
    }
))

//single
productRoute.get("/:id", asyncHandler(
    async(req,res)=>{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product)    
        }else{
            res.status(404)
            throw new Error("Product doesn not exist");
        }
        
    }
))


//product review
productRoute.post("/:id/review", asyncHandler(
    protect,
    async(req,res)=>{
        const {comment, rating} = req.body
        const product = await Product.findById(req.params.id);
        if(product){
            const reviewed = product.reviews.find(
                (r)=> r.user.toString() === req.user._id.toString()
            )
            if(reviewed){
                res.status(400)
                throw new Error("Product already reviews");
            }
            const review = {
                name: req.user.name,
                rating:Number(rating),
                comment,
                user:req.user._id
            };

            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = 
            product.reviews.reduce((acc,item)=> item.rating+ acc,0) / 
            product.reviews.length;

            await product.save(
                res.status(201).json({message:"Reviewed Added!"})
            )
        }else{
            res.status(404)
            throw new Error("Product doesn not exist");
        }
        
    }
))


module.exports = productRoute;