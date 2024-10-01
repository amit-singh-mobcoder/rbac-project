import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Bounce
import "react-toastify/dist/ReactToastify.css";
import { CircleArrowLeft } from "lucide-react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const showSuccessToast = () => {
    toast.success("Logged in successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const showErrorToast = () => {
    toast.error(`${error}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { username, password }
      );
      console.log(response);
      localStorage.setItem('accessToken', response.data.data.token)
      localStorage.setItem('user_id', response.data.data.user._id)
      localStorage.setItem('role_id', response.data.data.user.role)
      showSuccessToast()
      setTimeout(() => {
        navigate('/dashboard')
      }, 4000)
    } catch (error) {
      console.log("Error while doing login ", error.response.data.message);
      console.log("Error while doing login ", error.response);
      setError(error.response.data.message);
      setValidationError(error.response.data.errors[0])
      showErrorToast()
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
          <Link to="/">
            <CircleArrowLeft size={34} />
          </Link>
          <p className="text-4xl font-bold">Enter your details</p>
        </div>
        <div className="w-full flex justify-start flex-col">
        {validationError && <p className="text-red-500">{validationError}</p>}
        {error && <p className="text-red-500">{error}</p>}
        </div>

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

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-green-800 transition-colors"
        >
          Login
        </button>

        <p>
          Not registered?{" "}
          <Link to="/register" className="cursor-pointer">
            <span className="text-blue-500 underline">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
