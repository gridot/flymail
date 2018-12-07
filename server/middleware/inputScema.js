import Joi from 'joi';


const signupSchema = {
    firstName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid first name')),
    lastName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid last name')),
    email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50).required(),
    password: Joi.string().alphanum().min(3).max(1000).required().error(new Error('Enter a valid password'))
  };

  const loginSchema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50).required(),
    password: Joi.string().alphanum().min(3).max(1000).required().error(new Error('Enter a valid password'))
  };

  export {signupSchema, loginSchema};