import express from 'express';
import userRouter from '../../modules/userModule/user.routes';

const routers = express.Router();

routers.use('/user', userRouter)

export default routers;
