import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/User";

const RoleManagement = () => {
  const { user, setUser } = useContext(UserContext);
  const [rolesList, setRolesList] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    fetchRolesList();
  }, []);


  const fetchRolesList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8000/api/v1/roles", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRolesList(response.data.data);
    } catch (error) {
      console.error("Error while fetching roles list", error);
      setError(error.response.data.message)
    }
  };


  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr className="border-b">
              <th className="p-4 text-left font-semibold text-gray-700">Role Name</th>
              <th className="p-4 text-left font-semibold text-gray-700">Permissions {" / "} description</th>
            </tr>
          </thead>
          <tbody>
            {rolesList.length > 0 ? (
              rolesList.map((role, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b">
                  <td className="border-r">{role.role}</td>
                  <td className="">
                    <ul>
                      {role.permissions.map((permission, i) => (
                        <li key={i} className="flex justify-between p-2 border-b">
                          <span className="bg-blue-100 rounded text-blue-700 px-2">{permission.name}</span>
                          <span className="bg-green-100 rounded text-green-700 px-2">{permission.description}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  {error ? error : "No roles found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
