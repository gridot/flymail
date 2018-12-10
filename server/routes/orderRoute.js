import express from 'express';
import {verifyToken} from '../middleware/authentication';
import validateOrder from '../middleware/orderValidations';
import parcelOrders from '../controller/orderControl';

const orderRouter = express.Router();

orderRouter.post('/parcels', verifyToken, validateOrder, parcelOrders);

export default orderRouter;