import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { RoleContext } from "../../context/Role";
import { UserContext } from "../../context/User";
import TableLayout from "../../components/TableLayout";
import RoleManagement from "../../modules/RoleManagement";

function Admin() {
  const { user, setUser } = useContext(UserContext);
  const { userRole } = useContext(RoleContext);
  const [employeesList, setEmployeesList] = useState([]);
  const [employeeDefaultPermissions, setEmployeeDefaultPermissions] = useState(
    []
  );
  const [managersList, setManagersList] = useState([]);
  const [managerDefaultPermissions, setManagerDefaultPermissions] = useState([]);

  useEffect(() => {
    fetchUserDetails()
    fetchEmployeesList();
    fetchEmployeeRoleDefaultPermission();
    fetchManagersList();
    fetchManagersRoleDefaultPermission();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.get('http://localhost:8000/api/v1/user/profile', {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      })
      
      console.log("current user details: ",response.data.data);
      setUser(response.data.data)
    } catch (error) {
      console.log('Error while fetching user details', error)
    }
  }

  const fetchEmployeesList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user?role=employee"
      );
      console.log(response.data.data);
      setEmployeesList(response.data.data);
      // const id = response.data.data[0].role;
      localStorage.setItem("employee_role_id", response.data.data[0].role);
    } catch (error) {
      console.error("Error while fetching employees list", error);
    }
  };
  const fetchManagersList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user?role=manager"
      );
      console.log(response.data.data);
      setManagersList(response.data.data);
      // const id = response.data.data[0].role;
      localStorage.setItem("manager_role_id", response.data.data[0].role);
    } catch (error) {
      console.error("Error while fetching managers list", error);
    }
  };

  const fetchEmployeeRoleDefaultPermission = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const employee_role_id = localStorage.getItem("employee_role_id");
      const response = await axios.get(
        `http://localhost:8000/api/v1/role/${employee_role_id}/permissions`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("response", response);
      setEmployeeDefaultPermissions(response.data.data);
    } catch (error) {
      console.log(
        "Error while fetching default employee role permissions",
        error
      );
    }
  };
  const fetchManagersRoleDefaultPermission = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const manager_role_id = localStorage.getItem("manager_role_id");
      const response = await axios.get(
        `http://localhost:8000/api/v1/role/${manager_role_id}/permissions`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("response", response);
      setManagerDefaultPermissions(response.data.data);
    } catch (error) {
      console.log(
        "Error while fetching default manager role permissions",
        error
      );
    }
  };

  return (
    <div>
      <Navbar username={user.username} role={userRole} />
      <div className="min-h-screen flex flex-col justify-start items-center w-full py-4">
        {/* Employees Table */}
        <h1 className="text-3xl font-bold mb-4 text-start mt-12">Employees list</h1>
        <TableLayout userList={employeesList} userDefaultPermissions={employeeDefaultPermissions} roleName="employee" />
        {/* Managers Table */}
        <h1 className="text-3xl font-bold mb-4 text-start mt-4">Managers list</h1>
        <TableLayout userList={managersList} userDefaultPermissions={managerDefaultPermissions} roleName="manager" />
        {/* Role management */}
        <h1 className="text-3xl font-bold mb-4 text-start mt-4">Role management</h1>
        <RoleManagement/>
      </div>
    </div>
  );
}

export default Admin;
