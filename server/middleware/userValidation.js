import Joi from 'joi';

const validateUser = (user) => {
  const schema = {
    firstName: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().max(50)
      .required(),
    password: Joi.string().min(3).max(1000).required(),
  };
  return Joi.validate(user, schema, { abortEarly: false });
};

export default validateUser;
