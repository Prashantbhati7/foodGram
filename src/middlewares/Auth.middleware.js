import { User } from "../models/user.models.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import jwt from 'jsonwebtoken'
const VerifyJwt = async(req,res,next)=>{
    try{
    const {accessToken} = req.cookies;
    if (!accessToken)   throw new ApiError(401,"User not Logged in ")
    const decoded_token = await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    if (!decoded_token) throw  new ApiError(401,"Token is not valid")
    const user = await User.findById(decoded_token._id).select("-password -refreshToken");
    if (!user) throw new ApiError(401,"User not found ")
    req.user = user;
    next();
    }
    catch(error){
        console.log("error : ",error);
        throw new ApiError(401,"Authentication failed error in verification ")
    }
}

export {VerifyJwt}