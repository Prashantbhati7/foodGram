import mongoose from "mongoose";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

UserSchema.pre("save",async function(){
    if (this.isModified("password")) 
    this.password = await bcrypt.hash(this.password,10);
    return;
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}
UserSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullname:this.fullname
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}

const User = mongoose.model("User",UserSchema);

export {User};