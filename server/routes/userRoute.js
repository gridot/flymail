import express from 'express';
import {userSignup, userLogin} from '../controller/userControl';
import {validateSignup, validateLOgin} from '../middleware/userValidation';


const userRouter = express.Router();

userRouter.post('/auth/signup',validateSignup, userSignup);
userRouter.post('/auth/login',validateLOgin, userLogin);


export default userRouter;
