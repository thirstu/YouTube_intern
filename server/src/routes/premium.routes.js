

import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { 
    downloadVideo,
    sendPurchaseInvoice,
    makePaymentRequest,
    updateUserPlan,
} from '../controllers/premium.controller.js';

const router = Router();
router.use(verifyJWT);



router.route("/payment").post(upload.none(),makePaymentRequest);
router.route("/invoice").post(upload.none(),sendPurchaseInvoice);
router.route("/download").post(upload.none(),downloadVideo);
router.route("/updatePlan").post(upload.none(),updateUserPlan);