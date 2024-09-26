import express from "express";
import RoleRepository from "../repositories/role.repository";
import UserRepository from "../repositories/user.repository";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth.service";
import { validate } from "../middlewares/validation.middleware";
import { registerValidate, loginValidate } from "../validators/user-validation";

const router = express.Router();
const roleRepository = new RoleRepository();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository, roleRepository);
const authController = new AuthController(authService);

router
  .route("/register")
  .post(
    validate(registerValidate),
    authController.registerUser.bind(authController)
  );
router
  .route("/login")
  .post(validate(loginValidate), authController.login.bind(authController));

export default router;
