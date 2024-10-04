import express from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/role.middleware";
import RoleRepository from "../repositories/role.repository";
import RoleService from "../services/role.service";

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const userRepository = new UserRepository();
const userService = new UserService(userRepository, roleRepository);
const userController = new UserController(userService, roleService);
const router = express.Router();

router
  .route("/profile")
  .get(verifyJWT, userController.getProfile.bind(userController));

router
  .route("/:id")
  .delete(
    verifyJWT,
    checkPermission("delete:users"),
    userController.deleteUser.bind(userController)
  );

router
  .route("/role")
  .get(verifyJWT, userController.userRole.bind(userController));
router
  .route("/:id/permission")
  .patch(
    verifyJWT,
    checkPermission("manage:permissions"),
    userController.removePermission.bind(userController)
  );

router.route('/:id/permission/add').patch(verifyJWT, checkPermission("manage:permissions"), userController.addPermission.bind(userController))


router.route('/').get(userController.usersList.bind(userController));
export default router;
