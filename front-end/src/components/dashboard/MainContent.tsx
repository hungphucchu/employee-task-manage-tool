// src/components/MainContent.tsx
import React, { useState } from 'react';
import EmployeeTable from './employee/EmployeeTable';
import '../../css/dashboard/MainContent.css';
import CreateEmployeePopup from './employee/CreateEmployeePopUp';

const MainContent: React.FC = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [employeeListUpdate, setEmployeeListUpdate] = useState(false);
  
    const handleOpenPopup = () => {
      setIsPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };
  return (
    <div className="main-content">
      <h2>Manage Employee</h2>
      <button onClick={handleOpenPopup} className="create-employee-button">+ Create Employee</button>
      <input type="text" placeholder="Filter" className="filter-input" />
      <EmployeeTable employeeListUpdate={employeeListUpdate} onEmployeeListUpdate={() => setEmployeeListUpdate(!employeeListUpdate)}/>
      <CreateEmployeePopup isOpen={isPopupOpen} onClose={handleClosePopup} onNewEmployeeAdded={() => setEmployeeListUpdate(!employeeListUpdate)}/>
    </div>
  );
};

export default MainContent;


