import AuthController from "../controllers/auth.controller";
import express from 'express'
import UserRepository from "../repositories/user.repository";
import AuthService from "../services/auth.service";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.route('/register').post(authController.registerUser.bind(authController));
router.route('/login').post(authController.loginUser.bind(authController));

export default router;