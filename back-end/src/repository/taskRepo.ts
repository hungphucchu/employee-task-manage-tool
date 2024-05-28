import { Task } from "../dto/common.dto";
import BaseRepo from "./baseRepo";

class TaskRepo extends BaseRepo<Task> {}

export const taskRepo = new TaskRepo("tasks");
