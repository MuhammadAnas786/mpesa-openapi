import express from 'express'
import MpesaInstance from '../Controllers/Payment'
var router = express.Router();

/* GET c2b sample sandbox transaction result. */
router.get('/c2b',MpesaInstance.RunSample);

export default router;
