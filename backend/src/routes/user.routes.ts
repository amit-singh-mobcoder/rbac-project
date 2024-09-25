import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware'
import UserController from "../controllers/user.controller";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";


const userRepository = new UserRepository()
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const router = express.Router();


router.route('/admin').get(verifyJWT, authorizeRoles(["admin"]), userController.helloAdmin.bind(userController))
router.route('/manager').get(verifyJWT, authorizeRoles(["admin", "manager"]), userController.helloManager.bind(userController))
router.route('/user').get(verifyJWT, authorizeRoles(["admin", "manager", "user" ]), userController.helloUser.bind(userController))


export default router;