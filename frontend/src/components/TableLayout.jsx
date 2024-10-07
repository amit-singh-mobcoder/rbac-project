import React, { useState } from "react";
import axios from 'axios'
import { Trash2 } from 'lucide-react';
import { UserCog } from 'lucide-react';
import { Save } from 'lucide-react';

const TableLayout = ({ userList, userDefaultPermissions, roleName }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedPermission, setUpdatedPermissions] = useState([]);

  const handleEditButton = (userId) => {
    setEditingUserId(userId);
    const currentPermissions = userList.find(user => user._id === userId).permissions;
    setUpdatedPermissions(currentPermissions);
  };

  const handleSaveButton = () => {
    savePermissions(editingUserId);
    setEditingUserId(null);
  };

  const handleUpdatePermission = (permissionName) => {
    setUpdatedPermissions((prev) => {
      if (prev.includes(permissionName)) {
        return prev.filter(item => item !== permissionName); // Uncheck
      } else {
        return [...prev, permissionName]; // Check
      }
    });
  };

  const savePermissions = async (userId) => {
    // console.log("Updated permissions: ", updatedPermission);
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/user/${userId}/permissions`, {permissions: updatedPermission}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log('Permission updated successfully', response)
      window.location.reload();
    } catch (error) {
      console.error('Error while updating user permissions')
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr className="border-b">
              <th scope="col" className="p-4 text-left font-semibold text-gray-700">Username</th>
              <th scope="col" className="p-4 text-left font-semibold text-gray-700">Role Name</th>
              <th scope="col" className="p-4 text-left font-semibold text-gray-700">Manage Permissions</th>
              <th scope="col" className="p-4 text-right font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList && userList.length > 0 ? (
              userList.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{roleName}</td>
                  <td className="p-4">
                    {userDefaultPermissions && userDefaultPermissions.length > 0 ? (
                      userDefaultPermissions.map((item, i) => (
                        <span key={i} className="inline-flex items-center justify-center gap-4 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm mr-1 mb-1">
                          {item.name}
                          {editingUserId === user._id ? (
                            <input 
                              type="checkbox" 
                              checked={updatedPermission.includes(item.name)} 
                              onChange={() => handleUpdatePermission(item.name)} 
                            />
                          ) : (
                            <input type="checkbox" checked={user.permissions.includes(item.name)} disabled />
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No permissions assigned</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2 items-center justify-end">
                      {editingUserId === user._id ? (
                        <button
                          className="flex justify-center items-center gap-2 px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white transition duration-200"
                          onClick={handleSaveButton}
                        >
                          <span className="font-bold text-white">Save</span><Save/>
                        </button>
                      ) : (
                        <button
                          className="flex justify-center items-center gap-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white transition duration-200"
                          onClick={() => handleEditButton(user._id)}
                        >
                          <span className="font-bold text-white">Edit</span><UserCog/>
                        </button>
                      )}
                      {editingUserId !== user._id && (
                        <button className="flex justify-center items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white transition duration-200">
                          <span className="font-bold text-white">Delete</span><Trash2/>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLayout;