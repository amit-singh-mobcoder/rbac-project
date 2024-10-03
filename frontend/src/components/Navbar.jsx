import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";

function Navbar({ username }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role_id");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="h-12 bg-black min-w-full flex justify-between items-center px-8 py-2 relative">
      <p className="text-lg font-semibold text-white">Welcome, {username}</p>
      <div className="relative">
        <img
          src={avatar}
          alt="Profile"
          width={40}
          className="bg-white rounded-full border border-amber-300 cursor-pointer"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={dropdownVisible}
        />
        {dropdownVisible && (
          <div className="absolute right-0 top-full mt-2 w-48 border border-gray-100 rounded-lg shadow-lg">
            <div className="flex flex-col p-2 gap-2">
              <button className="px-4 py-2 border border-gray-100 text-left rounded hover:bg-black hover:text-white  transition duration-200">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-left rounded bg-red-500 text-white  transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;