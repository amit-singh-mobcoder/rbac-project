import express from 'express'
import RoleRepository from '../repositories/role.repository'
import RoleService from '../services/role.service'
import RoleController from '../controllers/role.controller'

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);
const router = express.Router();

router.route('/role').post(roleController.newRole.bind(roleController));
router.route('/roles').get(roleController.getRoles.bind(roleController))
router.route('/role/:id/permissions').get(roleController.getRolePermissions.bind(roleController))
router.route('/role/:id/permission').patch(roleController.addPermission.bind(roleController))
router.route('/role/:id/permission/delete').patch(roleController.removePermission.bind(roleController))

export default router;