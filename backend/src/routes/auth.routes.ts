import express from 'express'
import UserRepository from '../repositories/user.repository';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import { validateRequest } from '../middlewares/validation.middleware'

const router = express.Router()
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.route('/register').post(authController.registerUser.bind(authController))

export default router;