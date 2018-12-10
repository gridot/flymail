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
}

const { validateOrder } = Validator;
export default validateOrder;
