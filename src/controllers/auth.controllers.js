
import AsyncHandler from "../middlewares/AsyncHandler.middlerware.js";
import { FoodPartner } from "../models/foodPartner.models.js";
import { User } from "../models/user.models.js";
import { ApiError, ApiResponse } from "../utils/index.js";


const registerUser = AsyncHandler(async(req,res,next)=>{
    const {fullname,email,password} = req.body;
    if (!fullname || !email || !password) throw new ApiError(400,"All fields are required",{});
    const exists = await User.findOne({email});
    if (exists) throw new ApiError(400,"User already exists",{});
    const user = await User.create({fullname,email,password});
    if (!user) throw new ApiError(400,"Something went wrong ,(user not created)",{});
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    if (!accessToken || !refreshToken) throw new ApiError(400,"Something went wrong ,(access or refresh token not generated)",{});
    user.refreshToken = await refreshToken;
    await user.save({validateBeforeSave:false});
    const registeredUser = await User.findById(user._id).select("-password -refreshToken");
    if (!registerUser) throw new ApiError(400,"Something went wrong ,(user not found)",{});
    const options = {
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
    }
    return res.status(201).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(new ApiResponse(201,{user:registeredUser},"user registered successfully"))
})

const loginUser = AsyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if ( !email || email?.trim() === ""|| !password) throw new ApiError(400,"All fields are required",{});
    const user = await User.findOne({email});
    if (!user) throw new ApiError(400,"User not found",{});
    const isCorrectPass = await user.comparePassword(password);
    if (!isCorrectPass) throw new ApiError(400,"Incorrect password",{});
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    if (!loggedInUser) throw new ApiError(400,"Something went wrong ,(user not found)",{});
    const options = {
        httpsOnly:true,
        secure:process.env.NODE_ENV !== "development",
    }
    return res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"user logged in successfully"))
})

const loggedOutUser = AsyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:{
                refreshToken:1,
            }
        },
        {
            new:true,
        })
    return res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json(new ApiResponse(200,{},{message:"user logged out successfully"}))
})



// food partner auth 

const registerFoodPartner = AsyncHandler(async(req,res,next)=>{
    const {fullname,email,password} = req.body;
    if (!fullname || !email || !password || fullname?.trim() === "" || email?.trim() === "" || password?.trim() === "") throw new ApiError(400,"All fields are required",{});
    const alreadyexist = await FoodPartner.findOne({email});
    if (alreadyexist) throw new ApiError(400,"User already exists",{});
    const foodparter = await FoodPartner.create({fullname,email,password});
    if (!foodparter) throw new ApiError(400,"Something went wrong ,(foodparter not created)")
    const refreshToken= await foodparter.generateRefreshToken();
    const accessToken = await foodparter.generateAccessToken();
    foodparter.refreshToken = refreshToken;
    await foodparter.save({validateBeforeSave:false});
    const registeredFoodPartner = await FoodPartner.findById(foodparter._id).select("-password -refreshToken");
    const options = {
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
    }
    return res.status(201).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(new ApiResponse(201,{user:registeredFoodPartner},"food partner registered successfully"))
})

const loginFoodPartner = AsyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if (!email || email?.trim() === "" || !password) throw new ApiError(400,"All fields are required",{});
    const foodparter = await FoodPartner.findOne({email});
    if (!foodparter) throw new ApiError(400,"User not found",{});
    const isCorrectPass = await foodparter.comparePassword(password);
    if (!isCorrectPass) throw new ApiError(400,"Incorrect password",{});
    const refreshToken = await foodparter.generateRefreshToken();
    const accessToken = await foodparter.generateAccessToken();
    if (!refreshToken || !accessToken) throw new ApiError(400,"tokens not generated ");
    foodparter.refreshToken = refreshToken;
    await foodparter.save({validateBeforeSave:false});
    const loggedInFoodPartner = await FoodPartner.findById(foodparter._id).select("-password -refreshToken");
    if (!loggedInFoodPartner) throw new ApiError(400,"Something went wrong ,(user not found)",{});
    const options = {
        httpsOnly:true,
        secure:process.env.NODE_ENV !== "development",
    }
    return res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(new ApiResponse(200,{user:loggedInFoodPartner,accessToken,refreshToken},"food partner logged in successfully"))
})

const logOutFoodPartner = AsyncHandler(async(req,res)=>{
    await FoodPartner.findByIdAndUpdate(req.foodPartner._id,
        {
            $unset:{
                refreshToken:1,
            }
        },
        {
            new:true,
        })
    return res.status(200).clearCookie('refreshToken').clearCookie('accessToken').json(new ApiResponse(200,{},{message:"food partner logged out successfully"}))
})

export {registerUser,loginUser,loggedOutUser,registerFoodPartner,loginFoodPartner,logOutFoodPartner}