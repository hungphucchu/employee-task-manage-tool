import React, { useState, useRef } from 'react';
import '../../css/dashboard/Header.css';
import { useUserContext } from '../context/UserContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    updateUser(editedUser);
    setIsEditing(false);
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="header">
      <div className="header-right">
        <div className="notification-icon">
          <div className="badge">2</div>
        </div>
        <div
          className="profile-icon"
          onMouseEnter={() => setIsDropdownOpen(true)}
        >
          {isDropdownOpen && (
            <div className="dropdown" ref={dropdownRef}>
              <Button className='close-drop-down' text={'X'} onClick={handleCancel} />
              <ul>
                {user && Object.entries(user)
                  .filter(([key]) => !['id', 'ownerId', 'accessCode'].includes(key))
                  .map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}: </strong> 
                      {isEditing ? (
                        <input 
                          type="text" 
                          name={key} 
                          value={editedUser[key as keyof typeof editedUser]} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <span>{value}</span>
                      )}
                    </li>
                  ))}
              </ul>
              {isEditing ? (
                <Button className='submit-drop-down' text={'Submit'} onClick={handleSubmit} />
              ) : (
                <Button className='submit-drop-down' text={'Edit'} onClick={handleEditClick} />
              )}
            </div>
          )}
          <div className="profile-icon-content"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
