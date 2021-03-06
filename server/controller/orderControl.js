import pool from '../db/connection';
import { createOrder, selectAllOrders, updateOrder, updateDest, updatelocal , queryByTrackingId, selectUserOrder, cancelOrder, deleteOrder} from '../db/sql';
import shortid from 'shortid';

class OrderHandler {
    static parcelOrders(request, response) {
      const { parcelContent,metric,pickupLocation, destination, receiver, email, phoneNumber } = request.body;
      const user_id = request.authData.payload.user_id;
      const trackingID = shortid.generate();
      const currentLocation = 'Lagos';
      let weight = parseFloat(request.body.weight);
      weight = Math.round(weight);
      let cost = (weight) => {
       let perKg = 500;
        return weight * perKg;
     }
    let price = cost(weight);
  
      const values = [user_id, parcelContent, price, trackingID, weight, metric, pickupLocation, destination, receiver, email, phoneNumber, currentLocation];
      let Details = {"trackingID": trackingID, "Receiver": receiver, "Pickup Location": pickupLocation, "Destination": destination, "Current Location": currentLocation, "weight": weight + metric, "Parcel Content": parcelContent}
      pool.query(createOrder, values)
        .then(() => response.status(201)
          .json({    
            success: true,
            message: 'Your order was placed successfully',
            Details
          }))
        .catch(error => response.status(500)
          .json({
            success: false,
            message: error.message
          }));
    }

    static getAllOrders(request, response) {
      pool.query(selectAllOrders)
        .then((result) => {
          const allOrders = result.rows;
          return response.status(200)
            .json({
              success: true,
              message: 'All orders placed as of date',
              allOrders
            });
        })
        .catch(error => response.status(500)
          .json({
            success: false,
            message: error.message
          }));
    }

    static updateStatus(request, response) {
      const { parcelId } = request.params;
      const value = request.body.status;
      pool.query(updateOrder, [value, parcelId])
        .then(() => response.status(200)
          .json({
            message: 'Order is updated'
          }))
        .catch(error => response.status(500)
          .json({
            status: 'Fail',
            message: error.message
          }));
    }
    static destination(request, response) {
      const { parcelId } = request.params;
      const value = request.body.destination;
      pool.query(updateDest, [value, parcelId])
        .then(() => response.status(200)
          .json({
            message: 'Order is updated'
          }))
        .catch(error => response.status(500)
          .json({
            status: 'Fail',
            message: error.message
          }));
    }
    static location(request, response) {
      const { parcelId } = request.params;
      const value = request.body.currentLocation;
      pool.query(updatelocal, [value, parcelId])
        .then(() => response.status(200)
          .json({
            message: 'Order is updated'
          }))
        .catch(error => response.status(500)
          .json({
            status: 'Fail',
            message: error.message
          }));
    }

    static getSpecificOrder(request, response) {
      const { trackingID } = request.params;
       pool.query(queryByTrackingId, [trackingID])
       .then((result) => {
        const order = result.rows;
        return response.status(200)
          .json({
            success: true,
            message: 'Order with this ID',
            order
          });
      })
        .catch(error => response.status(500)
          .json({
            status: 'Fail',
            message: error.message
          }));
    }

    static getUserOrders(request, response) {
      const { user_id } = request.params;
      pool.query(selectUserOrder , [user_id])
        .then((result) => {
          const allOrders = result.rows;
          return response.status(200)
            .json({
              success: true,
              message: 'All orders placed as of date',
              allOrders
            });
        })
        .catch(error => response.status(500)
          .json({
            success: false,
            message: error.message
          }));
    }

    static cancelUserOrder(request, response) {
      const { parcelId } = request.params;
      const status = 'Cancelled';
      pool.query(cancelOrder , [status, parcelId])
        .then((result) => {
          const cancelledOrder = result.rows;
          return response.status(200)
            .json({
              success: true,
              message: 'This order is cancelled',
              cancelledOrder
            });
        })
        .catch(error => response.status(500)
          .json({
            success: false,
            message: error.message
          }));
    }

    static deleteAnOrder(request, response) {
      const { trackingID} = request.params;
      pool.query(deleteOrder, [trackingID])
        .then((result) => {
          return response.status(200)
            .json({
              success: true,
              message: 'This order is deleted',
            });
        })
        .catch(error => response.status(500)
          .json({
            success: false,
            message: error.message
          }));
    }
} 
  
const { parcelOrders, getAllOrders, updateStatus, destination, location, getSpecificOrder, getUserOrders, cancelUserOrder, deleteAnOrder } = OrderHandler;

export {parcelOrders, getAllOrders, updateStatus, destination, location, getSpecificOrder, getUserOrders, cancelUserOrder, deleteAnOrder};
