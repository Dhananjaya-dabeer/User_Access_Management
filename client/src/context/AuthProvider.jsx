import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "./auth-context";
import { errorToaster, successToaster } from "../utils/toastUtil";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await axios.get("/auth/me");

      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const signin = await axios.post("/auth/login", credentials);

      if (signin?.data?.success === true) {
        fetchMe();
        successToaster(signin.data.message);
        return true;
      }
    } catch (error) {
      errorToaster(error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials) => {
    try {
      setLoading(true);
      const register = await axios.post("/auth/signup", credentials);
      if (register?.data?.success === true) {
        successToaster(register?.data?.message);
        return true;
      }
    } catch (error) {
      errorToaster(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/auth/logout");
      setUser(null);
    } catch (error) {
      errorToaster(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
