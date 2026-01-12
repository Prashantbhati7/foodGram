import ImageKit from "imagekit";
import { ApiError } from "../utils/index.js";

console.log("imagekit publik key is ",process.env.IMAGEKIT_PUBLIC_KEY);
const imagekit = new ImageKit({
    
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})


async function uploadFile(file,filename){
    try{
         
        const result = await imagekit.upload({
            file,
            fileName:filename+' '+Date.now(),
            folder:'/foodGram'
        })
        
        return result;
    }catch(error){
        console.log(error);
        throw new ApiError(400,"Unable to upload file to cloud")
    }
}   

export {uploadFile
}