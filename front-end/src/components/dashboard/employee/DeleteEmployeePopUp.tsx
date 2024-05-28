import React, { useState, useEffect } from 'react';
import { Employee } from '../../../dto/common.dto';
import ApiHelper from '../../../helper/api-helper';
import '../../../css/common/PopUp.css'; 
import Popup from '../../common/PopUp';
import Button from '../../common/Button';

interface DeleteEmployeePopupProps {
  onClose: () => void;
  employee: Employee;
  onEmployeeListUpdate: () => void;
}

const DeleteEmployeePopup: React.FC<DeleteEmployeePopupProps> = ({ onClose, employee, onEmployeeListUpdate }) => {
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isDelete) {
      setTimeout(() => onClose(), 1000);
    }
  }, [isDelete, onClose]);

  const deleteEmployee = async () => {
    try {
      if (employee?.id) {
        const result = await ApiHelper.deleteEmployee({ id: employee?.id });
        if (result.success) {
          setIsDelete(true);
          onEmployeeListUpdate();
        }
      }
    } catch (error) {
      console.log(`Error deleting employee: ${error}`);
    }
  };

  return (
    <Popup>
      <div className="popup-header">
        <Button className="close-popup" text="X" onClick={onClose} />
      </div>
      {isDelete ? (
        <p>Deleted the employee successfully</p>
      ) : (
        <>
          <div>{`Do you want to delete the employee ${employee.name}?`}</div>
          <Button className="delete-button" text={`Confirm to delete employee ${employee.name}`} onClick={deleteEmployee} />
        </>
      )}
    </Popup>
  );
};

export default DeleteEmployeePopup;
