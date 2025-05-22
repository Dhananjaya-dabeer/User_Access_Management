import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { errorToaster } from "../utils/toastUtil";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/requests/mine");
        setRequests(res.data.data);
      } catch (err) {
        errorToaster(err);
      }
    };

    fetchRequests();
  }, []);

  const statusColor = {
    Pending: "text-yellow-600",
    Approved: "text-green-600",
    Rejected: "text-red-600",
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">My Access Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">
          You have not submitted any access requests yet.
        </p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-4 rounded shadow flex flex-col gap-1"
            >
              <h3 className="text-lg font-semibold">{req.software.name}</h3>
              <p>
                <span className="font-medium">Access Type:</span>{" "}
                {req.accessType}
              </p>
              <p>
                <span className="font-medium">Reason:</span> {req.reason}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className={statusColor[req.status] || "text-gray-600"}>
                  {req.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
