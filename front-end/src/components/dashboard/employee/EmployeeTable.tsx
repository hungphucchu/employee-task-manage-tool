import React, { useEffect, useState } from 'react';
import EmployeeRow from './EmployeeRow';
import '../../../css/dashboard/EmployeeTable.css';
import { Employee } from '../../../dto/common.dto';
import ApiHelper from '../../../helper/api-helper';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../../context/EmployeesContext';

interface EmployeeTableProps {
  employeeListUpdate: boolean;
  onEmployeeListUpdate: () => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employeeListUpdate, onEmployeeListUpdate }: EmployeeTableProps) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const { user } = useUserContext();
  const { addEmployee } = useEmployeeContext(); 
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployeeList = async () => {
      if (!user) {
        navigate('/user/login');
        return;
      }
      const employees = await ApiHelper.getAllEmployee();
      setEmployeeList(employees);

      addEmployee(employees);
    };
    getEmployeeList();
  }, [employeeListUpdate]);

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Department</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employeeList.map((employee, index) => (
          <EmployeeRow key={index} employee={employee} onEmployeeListUpdate={onEmployeeListUpdate} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
