import Joi from 'joi';
import {orderSchema, statusUpdate, destinationUpdate, locationUpdate} from './inputScema';
import jwt from 'jsonwebtoken';
import pool from '../db/connection';
import { queryOrdersById } from '../db/sql';



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

  static updateDestination(request, response, next) {
    
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
        const userInfo = request.authData.payload;
      if (userInfo.user_id !== data.rows[0].user_id) {
      return response.status(401)
      .json({
        success: false,
        message: 'You need to be the owner of this order to access this endpoint'
      });
  }
        
        const result = Joi.validate(request.body, destinationUpdate, { abortEarly: false });
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

  static locationValidator(request, response, next) {
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
        
        const result = Joi.validate(request.body, locationUpdate, { abortEarly: false });
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

const { validateOrder, getAllValidator, updateOrderValidator, updateDestination, locationValidator } = Validator;
export {validateOrder, getAllValidator, updateOrderValidator, updateDestination, locationValidator};
