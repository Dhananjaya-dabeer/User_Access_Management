import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>

        {user?.role === "Admin" && (
          <>
            <Link to="/create-software" className="mr-4">
              Create Software
            </Link>
            <Link to="/pending-requests" className="mr-4">
              Requests
            </Link>
          </>
        )}

        {user?.role === "Manager" && (
          <Link to="/pending-requests" className="mr-4">
            Requests
          </Link>
        )}

        {user?.role === "Employee" && (
          <>
            <Link to="/request-access" className="mr-4">
              Request Access
            </Link>
            <Link to="/my-requests" className="mr-4">
              My Requests
            </Link>
          </>
        )}
      </div>

      <div>
        {user ? (
          <Link onClick={logout} to="/login">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
