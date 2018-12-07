import Joi from 'joi';
import pool from '../db/connection';
import { queryUsersByEmail } from '../db/sql';
import {signupSchema, loginSchema} from './inputScema';


class Validator {

  static validateSignup(request, response, next) {
    const errors = {};
    let { email } = request.body;
    let invalidInput;
    let emailExist = "";

    const result = Joi.validate(request.body, signupSchema);
    if (result.error !== null) {
      errors.invalidInput = result.error.message;
    }
    pool.query(queryUsersByEmail, [email])
      .then((data) => {
        if (data.rowCount !== 0) {
          errors.emailExist = "Email already exist, please Signup with a new email"
        }
        if (JSON.stringify(errors) !== '{}') {
          return response.status(400)
            .json({
              success: false,
              message: "Please make sure to input correct values",
              errors
            });
          }
      next()     
    }) 
      .catch(error => response.status(500)
        .json({
          success: false,
          message: error.message
        }));
      
  }

  static validateLOgin(request, response, next) {
    let { email, password } = request.body;
    let emailExist = "";
    const errors = {};
    let invalidInput;

    const result = Joi.validate(request.body, loginSchema);
    if (result.error !== null) {
      errors.invalidInput = result.error.message;
    }

    pool.query(queryUsersByEmail, [email])
      .then((data) => {
        if (data.rowCount !== 0) {
          errors.emailExist = "Email not found. Please signup"
        }
        if (JSON.stringify(errors) !== '{}') {
          return response.status(400)
            .json({
              success: false,
              message: "Please make sure to input correct values",
              errors
            });
          }
      next()     
    }) 
      .catch(error => response.status(500)
        .json({
          success: false,
          message: error.message
        }));
  }
}

const { validateSignup, validateLOgin } = Validator;
export {validateSignup, validateLOgin };
