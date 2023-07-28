"use client";

import React, { useState } from "react";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <aside
      className={`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block ${
        isHovered ? "overflow-y-auto" : "overflow-y-hidden"
      } border-r border-gray-200 block w-full left-0`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} data={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
