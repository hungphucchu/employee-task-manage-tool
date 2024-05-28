import React from "react";
import Button from "../../common/Button";
import "../../../css/dashboard/EmployeeRow.css";
import { Employee } from "../../../dto/common.dto";
import { useState } from "react";
import DeleteEmployeePopup from "./DeleteEmployeePopUp";
import EditEmployeePopup from "./EditEmployeePopUp";

interface EmployeeRowProps {
  employee: Employee;
  onEmployeeListUpdate: () => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({
  employee,
  onEmployeeListUpdate,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <tr className="employee-row">
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.role}</td>
        <td>{employee.department}</td>
        <td>{employee.address}</td>
        <td>
          <Button
            className="edit-button"
            text="Edit"
            onClick={() => setIsEdit(true)}
          />
          <Button
            className="delete-button"
            text="Delete"
            onClick={() => setIsDelete(true)}
          />
        </td>
      </tr>
      {isDelete && (
        <DeleteEmployeePopup
          onClose={() => setIsDelete(false)}
          employee={employee}
          onEmployeeListUpdate={onEmployeeListUpdate}
        />
      )}
      {isEdit && (
        <EditEmployeePopup
          onClose={() => setIsEdit(false)}
          employee={employee}
          onEmployeeListUpdate={onEmployeeListUpdate}
        />
      )}
    </>
  );
};

export default EmployeeRow;
