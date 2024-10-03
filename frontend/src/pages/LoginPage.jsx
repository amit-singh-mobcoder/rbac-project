import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleArrowLeft } from "lucide-react";

function LoginPage() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const showToast = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleLogin = async () => {
    const { username, password } = formState;

    if (!username || !password) {
      setValidationError("Both fields are required");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          username,
          password,
        }
      );
      console.log(response);

      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("user_id", response.data.data.user._id);
      localStorage.setItem("role_id", response.data.data.user.role);

      showToast("success", "Logged in successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
        setValidationError(error.response.data.errors?.[0] || "");
      } else {
        setError("Network error, please try again later.");
      }
      showToast("error", error.response?.data.message || "Login failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer />

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
            value={formState.username}
            onChange={handleInputChange}
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
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full bg-black text-white py-2 rounded-lg mt-4 transition-colors ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-800"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
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
