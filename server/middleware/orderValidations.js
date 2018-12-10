import Joi from 'joi';
import {orderSchema} from './inputScema';


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

}

const { validateOrder, getAllValidator } = Validator;
export {validateOrder, getAllValidator};
