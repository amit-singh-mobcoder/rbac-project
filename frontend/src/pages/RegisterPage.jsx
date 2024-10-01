import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Bounce
import "react-toastify/dist/ReactToastify.css";
import { CircleArrowLeft } from 'lucide-react';

function RegisterPage() {
  const [roleList, setRoleList] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/roles");
        const responseData = response.data.data;
        const formattedData = responseData.map((item) => ({
          value: item.role,
          label: item.role.toUpperCase(),
        }));
        setRoleList(formattedData);
      } catch (error) {
        console.error("Error while fetching roles", error);
      }
    };

    fetchRoles();
  }, []);

  const showSuccessToast = () => {
    toast.success('User Registred successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        { username, role, password }
      );
      console.log(response);

      if (response.status === 201) {
        showSuccessToast();
        setTimeout(() => {
          navigate("/login");
        }, 3000)
      }
    } catch (error) {
      console.error(
        "Error while registering the user ",
        error.response.data.errors[0]
      );
      setError(error.response.data.errors[0]);
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      
      <div className="flex flex-col items-center justify-center border rounded-lg p-8 gap-6 bg-white shadow-md w-full max-w-md">
        <div className="w-full flex flex-col justify-start gap-4">
          <Link to='/'><CircleArrowLeft size={34}/></Link>
          <p className="text-4xl font-bold">Create your account</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Username Field */}
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="username" className="text-lg font-medium">
            Username
          </label>
          <input
            id="username"
            className="outline-none border px-4 py-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        {/* Role Select */}
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="role" className="text-lg font-medium">
            Role
          </label>
          <FormControl fullWidth variant="outlined">
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              displayEmpty
              className="bg-white rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Select a role
              </MenuItem>
              {roleList.length !== 0 ? (
                roleList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No roles available
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        {/* Password Field */}
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            id="password"
            className="outline-none border px-4 py-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-green-800 transition-colors"
        >
          Register
        </button>

        <p>
          Already registered?{" "}
          <Link to="/login" className="cursor-pointer">
            <span className="text-blue-500 underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
