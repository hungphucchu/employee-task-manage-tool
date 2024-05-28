import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Employee } from '../../dto/common.dto';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee[]) => void;
  updateEmployee: (employee: Employee) => void;
}

interface EmployeeProviderProps {
  children: ReactNode;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employees: Employee[]) => {
    setEmployees(employees);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
  };


  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee}}>
      {children}
    </EmployeeContext.Provider>
  );
};
