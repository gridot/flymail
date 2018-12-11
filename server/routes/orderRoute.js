import express from 'express';
import {verifyToken, parmitAdmin} from '../middleware/authentication';
import {validateOrder, getAllValidator, updateOrderValidator} from '../middleware/orderValidations';
import {parcelOrders, getAllOrders, updateStatus} from '../controller/orderControl';

const orderRouter = express.Router();

orderRouter.post('/parcels', verifyToken, validateOrder, parcelOrders);
orderRouter.get('/parcels', verifyToken, parmitAdmin, getAllOrders);
// orderRouter.get('/parcels/:parcelId', verifyToken, placeOrderValidator.getOrderListValidator, orderHandler.getUserOrder);
orderRouter.put('/parcels/:parcelId/status', verifyToken, parmitAdmin, updateOrderValidator, updateStatus);

export default orderRouter;