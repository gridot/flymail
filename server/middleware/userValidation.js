import Joi from 'joi';
import pool from '../db/connection';
import { queryUsersByEmail } from '../db/sql';


class Validator {

  static validateUser(request, response, next) {
    const schema = {
      firstName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid first name')),
      lastName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid last name')),
      email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50).required(),
      password: Joi.string().alphanum().min(3).max(1000).required().error(new Error('Enter a valid password'))
    };
    const errors = {};
    let { email } = request.body;
    let invalidInput;
    let emailExist = "";

    const result = Joi.validate(request.body, schema);
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
      .catch(error => response.status(500)
        .json({
          success: false,
          message: error.message
        }));
      });
  }
}

const { validateUser } = Validator;
export default validateUser;
