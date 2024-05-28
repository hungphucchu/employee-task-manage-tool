export interface User {
    id?: string,
    email?: string,
    username?: string,
    password?: string,
    employeeId?: string,
    ownerId?: string,
    accessCode?: string,
    accessString?:string,
}

export interface Employee {
    id?: string,
    name?: string,
    email?: string,
    department?: string,
    role?: string,
    address?: string,
    ownerId?: string,
    userId?: string
}

export interface Owner extends Employee {
}

export interface BaseWithKey {
    id: string;
  }
