import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const SignupPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const hadleOnchange = (e) => {
    if (e?.target?.id === "username") setUsername(e.target.value);
    if (e?.target?.id === "password") setPassword(e.target.value);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
      role: "Employee",
    };
    const isRegistered = await signup(credentials);
    if (isRegistered) navigate("/login");
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign Up
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="username"
                id="username"
                onChange={hadleOnchange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                id="password"
                onChange={hadleOnchange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all opacity-50"
                placeholder="role"
                disabled
                defaultValue={"Employee"}
              />
            </div>

            <button
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer ${
                loading && "opacity-25"
              }`}
              onClick={signupHandler}
              disabled={loading}
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
              onClick={() => navigate("/login")}
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
