import React from 'react';
import { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import Popup from '../../common/PopUp';

interface CreateEmployeePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNewEmployeeAdded: () => void;
}

const CreateEmployeePopup: React.FC<CreateEmployeePopupProps> = ({ isOpen, onClose, onNewEmployeeAdded }) => {
  const [completeCreate, setCompleteCreate] = useState(false);

  useEffect(() => {
    if (completeCreate) {
      setTimeout(() => {
        setCompleteCreate(false);
        onClose();
        onNewEmployeeAdded();
      }, 1000);
    }
  }, [completeCreate, onClose]);

  if (!isOpen) return null;

  return (
    <Popup>
        {
          completeCreate ? 
        <p>Create the new employee successfully</p>
        :
        <EmployeeForm onClose={onClose} isOpen={isOpen} onCompleteCreate={() => setCompleteCreate(true)}/>}
    </Popup>
  );
};

export default CreateEmployeePopup;
