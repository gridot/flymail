import Joi from 'joi';
import {orderSchema, statusUpdate} from './inputScema';
import pool from '../db/connection';
import { queryOrdersById } from '../db/sql';
import { stat } from 'fs';


class Validator {

    static validateOrder(request, response, next) {
        const result = Joi.validate(request.body, orderSchema, { abortEarly: false });
          if (result.error !== null) {
            return response.status(400)
            .json({
              success: false,
              message: result.error.message
            });
           }
           next();
    }

    static getAllValidator(request, response, next) {
      const { user_id } = request.params;
      if (!Number(user_id) || user_id <= 0) {
          return response.status(400)
              .json({
                  success: false,
                  message: 'Invalid user id'
              });
      }
      next();
  }

  static updateOrderValidator(request, response, next) {
    
    const {parcelId} = request.params;
    pool.query(queryOrdersById, [parcelId])
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(404)
            .json({
              success: false,
              message: 'This parcel order does not exist'
            });
        }
        if (data.rows[0].status === "Delivered"|| data.rows[0].status === 'Cancelled') {
          return response.status(406)
            .json({
              success: false,
              message: 'This parcel order is delivered or cancelled'
            });
        }
        
        const result = Joi.validate(request.body, statusUpdate, { abortEarly: false });
        if (result.error !== null) {
          return response.status(400)
          .json({
            success: false,
            message: result.error.message
          });
         }
        next();
      })
      .catch(error => response.status(500)
        .json({
          success: false,
          message: error.message
        }));
  }

}

const { validateOrder, getAllValidator, updateOrderValidator } = Validator;
export {validateOrder, getAllValidator, updateOrderValidator};
