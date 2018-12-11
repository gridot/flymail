import Joi from 'joi';
import 'dotenv/config';


const signupSchema = {
    firstName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid first name')),
    lastName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid last name')),
    email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50).required(),
    isadmin: Joi.string(),
    password: Joi.string().alphanum().min(3).max(1000).required().error(new Error('Enter a valid password'))
    
  };

  const loginSchema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50).required(),
    password: Joi.string().alphanum().min(3).max(1000).required().error(new Error('Enter a valid password'))
  };

  const orderSchema = {
    parcelContent: Joi.string().min(3).max(100).regex(/[a-zA-Z]*$/).required().error(new Error('Enter a valid parcel content description')),
    weight: Joi.number().required().error(new Error('Enter a valid weight')),
    metric: Joi.string().max(2).regex(/^[a-zA-Z]*$/).error(new Error('Metric should be in "kg"')),
    pickupLocation: Joi.string().required().error(new Error('Enter a valid pickup location')),
    destination: Joi.string().required().error(new Error('Enter a valid destination')),
    receiver: Joi.string().required().error(new Error('Enter a valid receiver name')),
    email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().error(new Error('Enter a valid email')),
    phoneNumber: Joi.number().integer().required().error(new Error('Enter a valid phone number')),
    token: [Joi.string(), Joi.number()]

  }
  const statusUpdate = {
    status: Joi.string().regex(/[a-zA-Z]*$/).valid(['Delivered', 'In-transit', 'Pending']).required().error(new Error('Status update should be one of these "Delivererd, In-transit or Pending"')),
    token: [Joi.string(), Joi.number()]
  }

  const destinationUpdate = {
    destination: Joi.string().regex(/[a-zA-Z]*$/).required().error(new Error('Destination should be a string"')),
    token: [Joi.string(), Joi.number()]
  }

  const locationUpdate = {
    currentLocation: Joi.string().regex(/[a-zA-Z]*$/).required().error(new Error('current location should be a string"')),
    token: [Joi.string(), Joi.number()]
  }

  const paramScheme = {
    parcelId:  Joi.number().error(new Error('Parcel id should be a number"'))
  }

  export {signupSchema, loginSchema, orderSchema, statusUpdate, destinationUpdate, locationUpdate, paramScheme};