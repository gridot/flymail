import express from 'express';
import userSignup from '../controller/userControl';
import validateUser from '../middleware/userValidation';


const userRouter = express.Router();

userRouter.post('/auth/signup',validateUser, userSignup);


export default userRouter;
