export interface User {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
  employeeId?: string;
  ownerId?: string;
  accessCode?: string;
  accessString?: string;
}

export interface Employee {
  name?: string;
  email: string;
  department?: string;
  role?: string;
  address?: string;
  ownerId?: string;
  userId?: string;
}

export interface Owner extends Employee {}

export interface BaseWithKey {
  id: string;
}

export interface EmployeeWithId extends Employee, BaseWithKey {}

export interface Task {
  id?: string;
  name?: string;
  assigner?: string;
  assignee?: string;
  status?: string;
}
