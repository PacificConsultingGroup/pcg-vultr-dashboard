
import express from 'express';
import { loginController, logoutController } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);

export default authRouter;