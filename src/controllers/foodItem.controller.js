import AsyncHandler from "../middlewares/AsyncHandler.middlerware.js";
import FoodItem from "../models/foodItem.models.js";
import { uploadFile } from "../services/cloud.services.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const addFoodItem = AsyncHandler(async(req,res,next)=>{
 
    const fileuploadResult = await uploadFile(req.file.buffer,req.file.originalname);
    if (!fileuploadResult) throw new ApiError(400,"Unable to upload file to cloud")
    console.log( "file upload url is ", fileuploadResult);
    const {name,description,price} = req.body;
    if (!name || !description || !price) throw new ApiError(400,"All fields are required");
    console.log("req is ",req);
    const foodItem = await FoodItem.create({
        name,
        description,
        price,
        video:fileuploadResult.url,
        FoodPartner:req.foodPartner._id
    })
    if (!foodItem) throw new ApiError(400,"Unable to create food item");
    return res.status(201).json(new ApiResponse(201,{foodItem},"food item created successfully"))
})

const getAllFoodItems = AsyncHandler(async(req,res,next)=>{
    const foodItems = await FoodItem.find({}).sort({createdAt:-1}).populate("FoodPartner");
    if (!foodItems) throw new ApiError(400,"Unable to fetch food items");
    return res.status(200).json(new ApiResponse(200,{foodItems},"food items fetched successfully"))
})




export {addFoodItem,getAllFoodItems}