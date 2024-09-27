import express from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/role.middleware";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const router = express.Router();

router
  .route("/profile")
  .get(verifyJWT, userController.getProfile.bind(userController));

router.route('/:id').delete(verifyJWT, checkPermission("delete:users"), userController.deleteUser.bind(userController))
export default router;
