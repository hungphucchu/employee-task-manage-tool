import { Request, Response } from 'express';
import { employeeService } from '../services/employeeService';
import { BaseWithKey, Employee, EmployeeWithId } from '../dto/common.dto';
import { userService } from '../services/userService';

class EmployeeController {

    setupEmployeeAccount = async (req: Request, res: Response): Promise<void> => {
        const employee: Employee = req.body;
        if (employee.email){
            const employeeAccRes = await employeeService.setupEmployeeAccount(employee);
            if (employeeAccRes?.success) res.status(200).json(employeeAccRes);
            else res.status(400).json(employeeAccRes);
        }else{
            res.status(400).json({success: false, message: "Please provide employee's email"});
        }
    }

    async getEmployee(req: Request, res: Response): Promise<void> {
        const employeeId = req.params.employeeId;
        try {
            const employee = await employeeService.getItem(employeeId);
            if (employee) {
                res.status(200).json(employee);
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            console.error('Error getting employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAllEmployee(req: Request, res: Response): Promise<void> {  
        try {
            const employees = await employeeService.getAllItems();
            if (employees) {
                res.status(200).json(employees);
            } else {
                res.status(404).json({ message: 'Can not fetch all employee' });
            }
        } catch (error) {
            console.error('Error getting employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createEmployee(req: Request, res: Response): Promise<void> {
        const { name, email, department, role, address } = req.body;
        try {
            const result = await employeeService.createItem({ name, email, department, role, address });
            if (result.success) {
                res.status(201).json({ message: 'Employee created successfully', employeeId: result.id });
            } else {
                res.status(500).json({ message: 'Failed to create employee' });
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteEmployee(req: Request, res: Response): Promise<void> {
        const employee: BaseWithKey = req.body;
        try {
            const deleteEmployeeResult = await employeeService.deleteItem(employee.id);
            const deleteEmployeeAccountResult = await userService.deleteUserByCriteria({employeeId: employee.id});
            if (deleteEmployeeResult.success && deleteEmployeeAccountResult.success) {
                res.status(200).json({ success: true, message: 'Employee deleted successfully' });
            } else {
                res.status(500).json({ success: false, message: 'Can not delete employee' });
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ success: false, message: error });
        }
    }

    async editEmployee(req: Request, res: Response): Promise<void> {
        const employee: EmployeeWithId = req.body;
        try {
            if (employee?.id){
                const result = await employeeService.updateItem(employee.id, employee);
                if (result) {
                    res.status(200).json({ success: result, message: 'Employee edited successfully' });
                } else {
                    res.status(500).json({ success: false, message: 'Can not edit employee' });
                }
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ success: false, message: error });
        }
    }
}

export const employeeController = new EmployeeController();
