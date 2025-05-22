import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { errorToaster, successToaster } from "../utils/toastUtil";

const RequestAccess = () => {
  const [softwares, setSoftwares] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/software");
        setSoftwares(res.data.data);
      } catch (err) {
        errorToaster(err);
      }
    };

    fetchData();
  }, []);

  const handleRequest = async (softwareId) => {
    const udpatedSoftwareState = softwares.map((item) => {
      return {
        ...item,
        isPending: "false",
        requestStatus: "Pending",
      };
    });
    console.log(udpatedSoftwareState);

    try {
      await axios.post("/requests", {
        softwareId,
        accessType: "Read", // or let user pick from modal
        reason: "Need access to review project requirements",
      });
      successToaster("Request sent");
      setSoftwares(udpatedSoftwareState);
    } catch (err) {
      errorToaster(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Available Software</h2>
      <div className="grid grid-cols-1 gap-4">
        {softwares.map((software) => (
          <div
            key={software.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{software.name}</h3>
              <p className="text-gray-600">
                {software.description || "Restricted"}
              </p>
              {software.requestStatus && (
                <p className="text-sm mt-1">
                  Request Status:{" "}
                  <span className="font-medium">{software.requestStatus}</span>
                </p>
              )}
            </div>

            {!software.accessGranted && (
              <button
                onClick={() => handleRequest(software.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {software.requestStatus
                  ? software.requestStatus
                  : " Request Access"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestAccess;
