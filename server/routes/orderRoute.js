import express from 'express';
import {verifyToken} from '../middleware/authentication';
import parcelOrders from '../controller/orderControl';

const orderRouter = express.Router();

orderRouter.post('/parcels', verifyToken, parcelOrders);

export default orderRouter;