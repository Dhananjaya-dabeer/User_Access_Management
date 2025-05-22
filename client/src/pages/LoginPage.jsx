import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import Loader from "../utils/loader";
const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const handleOnchange = (e) => {
    if (e.target?.id === "username") setUsername(e.target.value);
    if (e.target?.id === "password") setPassword(e.target.value);
  };

  const hadnleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    const isLoggedin = await login(credentials);
    if (isLoggedin) navigate("/");
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Log In
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Username"
                id="username"
                onChange={handleOnchange}
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
                onChange={handleOnchange}
              />
            </div>

            <button
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer ${
                loading && "opacity-25"
              }`}
              onClick={hadnleLogin}
              disabled={loading}
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
