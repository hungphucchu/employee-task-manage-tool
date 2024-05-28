import React from 'react';
import '../../css/dashboard/Sidebar.css';
import { useUserContext } from '../context/UserContext';

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const {user} = useUserContext();
  return (
    <div className="sidebar">
      <ul>
        {
         !user?.employeeId  &&  <li>
            <button onClick={() => setActiveComponent('manage-employee')} className="sidebar-button">
              Manage Employee
            </button>
          </li>
        }
        <li>
          <button onClick={() => setActiveComponent('manage-task')} className="sidebar-button">
            Manage Task
          </button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('message')} className="sidebar-button">
            Message
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
