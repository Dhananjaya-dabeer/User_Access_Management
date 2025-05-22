import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { errorToaster, successToaster } from "../utils/toastUtil";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/requests/pending");

        setRequests(res.data.data);
      } catch (err) {
        errorToaster(err);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.patch(`/requests/${id}`, { status: action });
      successToaster(`Request ${action.toLowerCase()}ed`);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: action } : req))
      );
    } catch (err) {
      errorToaster(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Pending Access Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">No access requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
            >
              <div>
                <p>
                  <span className="font-semibold">User:</span>{" "}
                  {req.user.username}
                </p>
                <p>
                  <span className="font-semibold">Software:</span>{" "}
                  {req.software.name}
                </p>
                <p>
                  <span className="font-semibold">Access Type:</span>{" "}
                  {req.accessType}
                </p>
                <p>
                  <span className="font-semibold">Reason:</span> {req.reason}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-medium ${
                      req.status === "Approved"
                        ? "text-green-600"
                        : req.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
              </div>

              {req.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(req.id, "Approved")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "Rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
