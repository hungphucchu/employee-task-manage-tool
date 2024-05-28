import { Employee } from "../dto/common.dto";
import BaseRepo from "./baseRepo";

class EmployeeRepo extends BaseRepo<Employee> {}

export const employeeRepo = new EmployeeRepo("employees");
