import express from 'express';
import {verifyToken, parmitAdmin} from '../middleware/authentication';
import {validateOrder, getAllValidator} from '../middleware/orderValidations';
import {parcelOrders, getAllOrders} from '../controller/orderControl';

const orderRouter = express.Router();

orderRouter.post('/parcels', verifyToken, validateOrder, parcelOrders);
orderRouter.get('/parcels', verifyToken, parmitAdmin, getAllOrders);

export default orderRouter;