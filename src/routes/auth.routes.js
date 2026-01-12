import { Router } from "express";
import { loggedOutUser, loginFoodPartner, loginUser, logOutFoodPartner, registerFoodPartner, registerUser } from "../controllers/auth.controllers.js";
import { VerifyJwt } from "../middlewares/Auth.middleware.js";
import { VerifyFoodParnter } from "../middlewares/VerifyFoodPartner.middleware.js";
const router = Router()


// user routes 
router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(VerifyJwt,loggedOutUser)

// food partner 
router.route('/foodpartner/register').post(registerFoodPartner)
router.route('/foodpartner/login').post(loginFoodPartner)
router.route('/foodpartner/logout').get(VerifyFoodParnter,logOutFoodPartner)


export default router;