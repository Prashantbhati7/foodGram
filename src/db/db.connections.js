import mongoose from "mongoose";
import { ApiError } from "../utils/index.js";
import { configDotenv } from "dotenv";
configDotenv()

export const connection = async ()=>{
    try{
        return await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    }catch(error){
        throw new ApiError(500,"error in connection with database",{});
    }    
}