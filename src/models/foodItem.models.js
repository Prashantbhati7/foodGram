import mongoose from "mongoose";
import { FoodPartner } from "./foodPartner.models.js";

const foodItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    FoodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodPartner",
        required:true
    }
})


const FoodItem = mongoose.model("FoodItem",foodItemSchema);

export default FoodItem;