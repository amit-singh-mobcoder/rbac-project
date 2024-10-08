import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RolePermissionsMatrix = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/v1/roles', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        // console.log("roles", response.data.data)
        setRoles(response.data.data);
      } catch (error) {
        console.error('Error fetching roles and permissions:', error);
      }
    };

    fetchRoles();
  }, []);

  let allPermissions = Array.from(
    new Set(roles.flatMap(role => role.permissions.map(permission => permission.name)))
  );
  //console.log("all permissions", allPermissions)
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Role Permissions Matrix</h2>
      <div className="overflow-x-auto rounded-md shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Actions</th>
              {roles.map((role, index) => (
                <th key={index} className="px-4 py-2 border">
                  {role.role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPermissions.map((permission, permIndex) => (
              <tr key={permIndex} className="hover:bg-gray-100">
                <td className="px-4 py-2 border font-semibold"><span className=''>{permission}</span></td>
                {roles.map((role, roleIndex) => (
                  <td key={roleIndex} className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={role.permissions.some(perm => perm.name === permission)}
                      readOnly
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolePermissionsMatrix;
