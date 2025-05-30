import express from 'express';
import { doLogin, doRegister,doAdminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

//User register

userRouter.post('/register',doRegister);
userRouter.post('/login',doLogin);
userRouter.post('/admin',doAdminLogin);

export default userRouter;