// src/routes/userRoutes.ts
import { Router } from 'express';
import { employeeController } from '../controller/employeeController';
import { authenticateMiddleware } from '../middleware/authentication';
const router = Router();

router.post('/setup',authenticateMiddleware.authenticateToken, employeeController.setupEmployeeAccount);
router.post('/',authenticateMiddleware.authenticateToken, employeeController.createEmployee);
router.get('/:employeeId',authenticateMiddleware.authenticateToken, employeeController.getEmployee);
router.get('/',authenticateMiddleware.authenticateToken, employeeController.getAllEmployee);
router.delete('/',authenticateMiddleware.authenticateToken, employeeController.deleteEmployee);
router.put('/',authenticateMiddleware.authenticateToken, employeeController.editEmployee);
export default router;
