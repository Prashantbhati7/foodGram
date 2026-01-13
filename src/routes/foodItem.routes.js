import { Router } from "express";
import { VerifyFoodParnter } from "../middlewares/VerifyFoodPartner.middleware.js";
import { addFoodItem, getAllFoodItems } from "../controllers/foodItem.controller.js";
import multer from "multer";

const upload = multer({
//    storage: multer.diskStorage({
//      destination: function(req,file,cb){
//         cb(null,'./public/temp')
//      },
//      filename:function(req,file,cb){
//         cb(null,file.originalname+' '+Date.now())
//      }
//    }),
        storage: multer.memoryStorage()
}
)


const router = Router();

// api/v1/food

router.route('/').post(VerifyFoodParnter,upload.single('video'),addFoodItem);
router.route('/').get(getAllFoodItems);

export default router;