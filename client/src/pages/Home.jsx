import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">User Access Management System</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        This platform allows Admins to manage software, Employees to request
        access, and Managers to approve or reject requests.
      </p>

      {!user && (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Sign Up
          </Link>
        </div>
      )}

      {user && (
        <p className="text-md text-green-600 font-medium">
          Welcome back, <span className="font-semibold">{user.name}</span>!
          You're logged in as <strong>{user.role}</strong>.
        </p>
      )}
    </div>
  );
};

export default Home;
