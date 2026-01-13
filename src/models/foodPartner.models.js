import mongoose from "mongoose";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

const foodPartnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


foodPartnerSchema.pre("save",async function(){
    if (this.isModified("password")) 
    this.password = await bcrypt.hash(this.password,10);
    return;
})

foodPartnerSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

foodPartnerSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}
foodPartnerSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullname:this.fullname
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}


const FoodPartner = mongoose.model("FoodPartner",foodPartnerSchema);

export {FoodPartner}