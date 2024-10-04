import React from "react";
import { UserRoundPen, UserRoundX } from "lucide-react";

const TableLayout = ({ userList, userDefaultPermissions, roleName }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr className="border-b">
              <th
                scope="col"
                className="p-4 text-left font-semibold text-gray-700"
              >
                Username
              </th>
              <th
                scope="col"
                className="p-4 text-left font-semibold text-gray-700"
              >
                Role Name
              </th>
              <th
                scope="col"
                className="p-4 text-left font-semibold text-gray-700"
              >
                Manage Permissions
              </th>
              <th
                scope="col"
                className="p-4 text-right font-semibold text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userList && userList.length > 0 ? (
              userList.map((user, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{roleName}</td>
                  <td className="p-4">
                    {userDefaultPermissions &&
                    userDefaultPermissions.length > 0 ? (
                      userDefaultPermissions.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center justify-center gap-4 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm mr-1 mb-1"
                        >
                          {item.name}{user.permissions.includes(item.name)? <input type="checkbox" checked="checked"/> : <input type="checkbox"/>}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        No permissions assigned
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2 items-center justify-end">
                      <button
                        aria-label={`Edit ${user.username}`}
                        className="inline-flex items-center px-3 py-2 bg-yellow-500 text-white hover:bg-yellow-600 transition duration-150 rounded-md shadow-sm"
                      >
                        <UserRoundPen />
                        
                      </button>
                      <button
                        aria-label={`Delete ${user.username}`}
                        className="inline-flex items-center px-3 py-2 bg-red-500 text-white hover:bg-red-600 transition duration-150 rounded-md shadow-sm"
                      >
                        <UserRoundX />
                        
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLayout;
