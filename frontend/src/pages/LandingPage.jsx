import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex flex-col justify-center items-center gap-8">
        {/* Navbar */}
        <div className="backdrop-blur-sm bg-white/30 border flex justify-between w-full max-w-[800px] mt-4 py-2 px-4 rounded-lg items-center shadow-sm">
          <p className="font-semibold">RBAC</p>
          <div className="flex gap-4">
            <Link to="/login">
              <button className="border px-4 py-1 shadow-sm rounded-md">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="border px-4 py-1 text-white bg-black rounded-md">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Hero section */}
        <div className="mt-52 text-center flex flex-col items-center">
          <p className="text-[72px] font-bold">RBAC</p>
          <p className="max-w-[700px] text-lg leading-relaxed">
            Role-based access control (RBAC) refers to the idea of assigning
            permissions to users based on their role within an organization. It
            offers a simple, manageable approach to access management that is
            less prone to error than assigning permissions to users
            individually.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
