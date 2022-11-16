const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    text:{
        type:String,
        require:true,
    },
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    }
},{
    timestamps:true
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product;