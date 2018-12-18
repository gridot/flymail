import express from 'express';
import {verifyToken, parmitAdmin} from '../middleware/authentication';
import {validateOrder, getAllValidator, updateOrderValidator, updateDestination, locationValidator, getAparcel, cancelOrder, deleteValidator} from '../middleware/orderValidations';
import {parcelOrders, getAllOrders, updateStatus, destination, location, getSpecificOrder, getUserOrders, cancelUserOrder, deleteAnOrder} from '../controller/orderControl';

const orderRouter = express.Router();

orderRouter.post('/parcels', verifyToken, validateOrder, parcelOrders);
orderRouter.get('/parcels', getAllOrders);
orderRouter.get('/parcels/:trackingID', verifyToken, getAparcel, getSpecificOrder);
orderRouter.get('/users/:user_id/parcels', verifyToken, getUserOrders);
orderRouter.put('/parcels/:parcelId/status', verifyToken, parmitAdmin, updateOrderValidator, updateStatus);
orderRouter.put('/parcels/:parcelId/destination', verifyToken, updateDestination, destination);
orderRouter.put('/parcels/:parcelId/presentLocation', verifyToken, parmitAdmin, locationValidator, location);
orderRouter.put('/parcels/:parcelId/cancel', verifyToken, cancelOrder, cancelUserOrder);
orderRouter.delete('/parcels/:trackingID/delete', verifyToken, parmitAdmin, deleteValidator, deleteAnOrder )

export default orderRouter;