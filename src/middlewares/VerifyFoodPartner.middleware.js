import { ApiError } from "../utils/index.js";
import { FoodPartner } from "../models/foodPartner.models.js";
import jwt from "jsonwebtoken"

const VerifyFoodParnter = async(req,res,next)=>{
    try{
    const {accessToken} = req.cookies;
    if (!accessToken)   throw new ApiError(401,"User not Logged in ")   
    const decoded_token = await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    if (!decoded_token) throw  new ApiError(401,"Token is not valid")   
    const foodparter = await FoodPartner.findById(decoded_token._id).select("-password -refreshToken");
    if (!foodparter) throw new ApiError(401,"User not found ")
    req.foodPartner = foodparter;
    next();
}
    catch(error){
        console.log("error : ",error);
        throw new ApiError(401,"food Partner authenticatoin failed error in verification")
    }
}

export {VerifyFoodParnter}