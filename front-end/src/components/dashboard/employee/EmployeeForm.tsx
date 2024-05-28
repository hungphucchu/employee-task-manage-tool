import React, { useState } from "react";
import "../../../css/common/PopUp.css";
import { Employee } from "../../../dto/common.dto";
import ApiHelper from "../../../helper/api-helper";
import { useUserContext } from "../../context/UserContext";

interface CreateEmployeePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteCreate: () => void;
}

const EmployeeForm: React.FC<CreateEmployeePopupProps> = ({
  isOpen,
  onClose,
  onCompleteCreate,
}) => {
  const [employee, setEmployee] = useState<Employee>({
    name: "",
    email: "",
    role: "",
    department: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user } = useUserContext();

  if (!isOpen) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const response = await ApiHelper.setupNewEmployeeAccount({
        ...employee,
        ownerId: user?.id,
      });
      if (response.success) {
        onCompleteCreate();
      } else {
        setErrorMessage("User already has the email");
      }
    } catch (error) {
      console.error(`Error creating new employee with ${error}`);
      setErrorMessage("An error occurred while creating the employee.");
    }
  };

  return (
    <>
      <div className="popup-header">
        <h2>Create Employee</h2>
        <button onClick={onClose} className="close-button">
          X
        </button>
      </div>
      <form className="popup-form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="text"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            value={employee.role}
            onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            value={employee.department}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={employee.address}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })
            }
          />
        </div>
        <button type="submit" className="create-button">
          Create
        </button>
      </form>
    </>
  );
};

export default EmployeeForm;
