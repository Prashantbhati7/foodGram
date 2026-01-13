


import { Router } from "express";

import { getAfoodPartnerdetails, getAfoodPartnerReels } from "../controllers/foodpartner.controller.js";


const router = Router();


router.route('/:id').get(getAfoodPartnerdetails)
router.route('/:id/reels').get(getAfoodPartnerReels);

export default router;