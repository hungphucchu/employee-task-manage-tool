import React from "react";
import "../../css/chat/UserList.css";
import { Employee } from "../../dto/common.dto";

interface UserListProps {
  users: Employee[];
  selectedUser: Employee | null;
  setSelectedUser: (user: Employee) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div
          key={user.userId}
          className={`user-item ${selectedUser && selectedUser.userId === user.userId ? "selected" : ""}`}
          onClick={() => setSelectedUser({ ...user, userId: user.id })}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
