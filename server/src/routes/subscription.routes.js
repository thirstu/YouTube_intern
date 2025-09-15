import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getChannelSubscriberCount, getSubscribedChannels,getUserChannelSubscribers,toggleSubscription } from '../controllers/subscription.controller.js';

const router = Router();
router.use(verifyJWT);



router.route("/toggle/:channelId").get(toggleSubscription);
router.route("/channels/:subscriberId").get(getSubscribedChannels);
router.route("/subscribers/:channelId").get(getUserChannelSubscribers);
router.route("/subscribers/count/:channelId").get(getChannelSubscriberCount);


export default router;


////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files