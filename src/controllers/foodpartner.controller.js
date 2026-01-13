import AsyncHandler from "../middlewares/AsyncHandler.middlerware.js";
import FoodItem from "../models/foodItem.models.js";
import { FoodPartner } from "../models/foodPartner.models.js";
import { ApiError, ApiResponse } from "../utils/index.js";

const getAfoodPartnerdetails = AsyncHandler(async(req,res,next)=>{
        const foodPartner = await FoodPartner.findById(req.params.id);
        if (!foodPartner) throw new ApiError(400,"Food partner not found");
        console.log("food partner is ",foodPartner);
        return res.status(200).json(new ApiResponse(200,foodPartner,"food partner fetched successfully"))
})

const getAfoodPartnerReels = AsyncHandler(async(req,res,next)=>{
    const allReels = await FoodItem.find({FoodPartner:req.params.id}).sort({createdAt:-1});
    if (!allReels) throw new ApiError(400,"Reels not found");
    return res.status(200).json(new ApiResponse(200,allReels,"reels fetched successfully"))
})

export {getAfoodPartnerdetails,getAfoodPartnerReels};