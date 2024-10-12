import { Router } from 'express';
import { UserControllers } from '../controllers/users.controller.js';

const usersController = new UserControllers();
const router = Router();

router.get('/', usersController.getAllUsers);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);
router.get('/:uid', usersController.getUser);
// router.get("/mock", usersController.createUserMock); //la mock de user esta en la ruta mocks
export default router;
