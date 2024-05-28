import React, { useState, useEffect } from "react";
import { Employee } from "../../../dto/common.dto";
import ApiHelper from "../../../helper/api-helper";
import "../../../css/common/PopUp.css";
import Popup from "../../common/PopUp";
import Button from "../../common/Button";
import InputForm, { InputField } from "../../common/InputForm";

interface EditEmployeePopupProps {
  onClose: () => void;
  employee: Employee;
  onEmployeeListUpdate: () => void;
}

const EditEmployeePopup: React.FC<EditEmployeePopupProps> = ({
  onClose,
  employee,
  onEmployeeListUpdate,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setTimeout(() => onClose(), 1000);
    }
  }, [isEdit, onClose]);

  const editEmployee = async (editEmployee: Employee) => {
    try {
      if (editEmployee) {
        const updateEmployee: Employee = {
          id: employee?.id,
          name: editEmployee.name !== "" ? editEmployee.name : employee.name,
          address:
            editEmployee.address !== ""
              ? editEmployee.address
              : employee.address,
          role: editEmployee.role !== "" ? editEmployee.role : employee.role,
          department:
            editEmployee.department !== ""
              ? editEmployee.department
              : employee.department,
        };

        const result = await ApiHelper.editEmployee(updateEmployee);

        if (result.success) {
          setIsEdit(true);
          onEmployeeListUpdate();
        }
      }
    } catch (error) {
      console.log(`Error editing employee: ${error}`);
    }
  };

  const nameInput: InputField = {
    name: "name",
    type: "text",
    placeholder: `${employee.name}`,
    inputName: "Employee Name",
  };

  const roleInput: InputField = {
    name: "role",
    type: "text",
    placeholder: `${employee.role}`,
    inputName: "Employee Role",
  };

  const departmentInput: InputField = {
    name: "department",
    type: "text",
    placeholder: `${employee.department}`,
    inputName: "Employee Department",
  };

  const addressInput: InputField = {
    name: "address",
    type: "text",
    placeholder: `${employee.address}`,
    inputName: "Employee Address",
  };

  return (
    <Popup>
      <div className="popup-header">
        <Button className="close-popup" text="X" onClick={onClose} />
      </div>
      {isEdit ? (
        <p>Edit the employee successfully</p>
      ) : (
        <>
          <h2>{`Edit employee with name of ${employee.name}`}</h2>
          <InputForm
            inputs={[nameInput, roleInput, departmentInput, addressInput]}
            onSubmit={editEmployee}
            buttonName="confirm to edit"
            buttonClassName="edit-button"
          />
        </>
      )}
    </Popup>
  );
};

export default EditEmployeePopup;
