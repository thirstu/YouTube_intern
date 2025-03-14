import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';

import { healthCheck } from '../controllers/health.controller.js';

const router = Router();



router.route("/health-check").get(healthCheck);


export default router;




////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files