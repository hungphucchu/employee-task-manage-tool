import { Task } from "../dto/common.dto";
import BaseService from "./baseService";
import { taskRepo } from "../repository/taskRepo";
class TaskService extends BaseService<Task> {
  constructor() {
    super(taskRepo);
  }

  public getAllTaskByCriteria = async (task: Task, matchAll: boolean) => {
    let getTaskByCriteriaRes = null;
    try {
      const tasks = await taskRepo.getItemsByCriteria(task, matchAll);
      if (tasks && tasks.length > 0)
        getTaskByCriteriaRes = {
          success: true,
          tasks: tasks,
          message: "Complete getting the employees by criteria!",
        };
      return getTaskByCriteriaRes;
    } catch (error) {
      console.error(`Error getting the employees: ${error}`);
      return { success: false, message: error };
    }
  };
}

export const taskService = new TaskService();
