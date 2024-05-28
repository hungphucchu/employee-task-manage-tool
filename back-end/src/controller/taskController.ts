import { Request, Response } from "express";
import { taskService } from "../services/taskService";
import { BaseWithKey, EmployeeWithId, Task } from "../dto/common.dto";
import { userService } from "../services/userService";

class TaskController {
  async getAllTaskByCriteria(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTaskByCriteria(req.body, false);
      if (tasks) {
        res.status(200).json(tasks);
      } else {
        res.status(404).json({ message: "Can not fetch all tasks" });
      }
    } catch (error) {
      console.error("Error getting tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const newTask: Task = req.body;
    try {
      const result = await taskService.createItem(newTask);
      if (result.success) {
        res
          .status(201)
          .json({ message: "Task created successfully", taskId: result.id });
      } else {
        res.status(500).json({ message: "Failed to create task" });
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const task: Task = req.body;
    try {
      if (task.id) {
        const deleteEmployeeResult = await taskService.deleteItem(task.id);
        if (deleteEmployeeResult.success) {
          res
            .status(200)
            .json({ success: true, message: "Task deleted successfully" });
        } else {
          res
            .status(500)
            .json({ success: false, message: "Can not delete task" });
        }
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ success: false, message: error });
    }
  }

  async editTask(req: Request, res: Response): Promise<void> {
    const task: Task = req.body;
    try {
      if (task?.id) {
        const result = await taskService.updateItem(task.id, task);
        if (result) {
          res
            .status(200)
            .json({ success: result, message: "Task edited successfully" });
        } else {
          res
            .status(500)
            .json({ success: false, message: "Can not edit task" });
        }
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ success: false, message: error });
    }
  }
}

export const taskController = new TaskController();
