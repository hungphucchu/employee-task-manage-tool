import { Router } from 'express';
import { taskController } from '../controller/taskController';
import { authenticateMiddleware } from '../middleware/authentication';
const router = Router();


router.post('/',authenticateMiddleware.authenticateToken, taskController.createTask);
router.post('/',authenticateMiddleware.authenticateToken, taskController.getAllTaskByCriteria);
router.delete('/',authenticateMiddleware.authenticateToken, taskController.deleteTask);
router.put('/',authenticateMiddleware.authenticateToken, taskController.editTask);

export default router;
