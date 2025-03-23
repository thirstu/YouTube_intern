

import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { 
    createOrder,
  savePaymentData,
  verifyPayment,
  verifyPaymentStatus,
} from '../controllers/payment.controller.js';

const router = Router();
router.use(verifyJWT);

router.route("/order").post(upload.none(),createOrder);
router.route("/saveData").post(upload.none(),savePaymentData);
router.route("/verifyPayment").post(upload.none(),verifyPayment);
router.route("/verifyStatus/:paymentId").get(upload.none(),verifyPaymentStatus);