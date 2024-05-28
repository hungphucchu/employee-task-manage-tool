import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import '../../css/dashboard/Dashboard.css';
import { useUserContext } from '../context/UserContext';
import ChatContainerEmployee from '../chat/ChatContainerEmployee';
import ChatContainerOwner from '../chat/ChatContainerOwner';

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('manage-employee');
  const {user} = useUserContext();

  const renderContent = () => {
    switch (activeComponent) {
      case 'manage-employee':
        return  !user?.employeeId && <MainContent />;
      case 'manage-task':
        return <div>Manage Task Component</div>;
      case 'message':
        return !user?.employeeId ? <ChatContainerOwner /> : <ChatContainerEmployee />;
      default:
        return !user?.employeeId ? <MainContent /> : <div>Manage Task Component</div>;
    }
  };

  return (
    
      <div className="dashboard">
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="content">
          <Header />
          {renderContent()}
        </div>
      </div>

  );
};

export default Dashboard;
