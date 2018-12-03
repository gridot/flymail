import pool from '../db/connection';
import { createOrder } from '../db/sqlQueries';
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
} 
  
const { parcelOrders } = orderHandler;

export default parcelOrders;
