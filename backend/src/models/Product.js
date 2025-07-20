import mongoose from "mongoose";

// 1- create a schema
// 2- create a model based on the schema

const productSchema = new mongoose.Schema({
    name: {type: String,required: true },
    description: {type: String,required: true },
    image: {type: String,required: true },
    price: {type: Number,required: true,default: 0 },
    category: {type: String,required: true },
    stock: {type: Number,required: true,default: 0 },
    isAvailable: {type: Boolean,required: true,default: true }
}, 
{timestamps: true} //automatically adds createdAt and updatedAt fields
);

const Product = mongoose.model('Product', productSchema);
export default Product;