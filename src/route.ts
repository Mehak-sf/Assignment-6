import express from 'express';
import { request } from 'http';
import { userController } from './controller.js';
import { User } from '../public/user.js';

const route = express.Router();

route.get('/users', userController.getAll);
route.get('/users/:id', userController.getUserById);
route.put('/update/:id', userController.updateUser);
route.delete('/delete/:id', userController.deleteUser);
export default route;
