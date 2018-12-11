import express from 'express';
import {verifyToken, parmitAdmin} from '../middleware/authentication';
import {validateOrder, getAllValidator, updateOrderValidator, updateDestination, locationValidator, getAparcel} from '../middleware/orderValidations';
import {parcelOrders, getAllOrders, updateStatus, destination, location, getSpecificOrder} from '../controller/orderControl';

const orderRouter = express.Router();

orderRouter.post('/parcels', verifyToken, validateOrder, parcelOrders);
orderRouter.get('/parcels', verifyToken, parmitAdmin, getAllOrders);
orderRouter.get('/parcels/:trackingID', verifyToken, getAparcel, getSpecificOrder);
orderRouter.put('/parcels/:parcelId/status', verifyToken, parmitAdmin, updateOrderValidator, updateStatus);
orderRouter.put('/parcels/:parcelId/destination', verifyToken, updateDestination, destination);
orderRouter.put('/parcels/:parcelId/presentLocation', verifyToken, parmitAdmin, locationValidator, location);

export default orderRouter;