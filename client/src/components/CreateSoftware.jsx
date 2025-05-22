import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { successToaster, errorToaster } from "../utils/toastUtil";

const accessOptions = ["Read", "Write", "Admin"];

const CreateSoftware = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (level) => {
    setForm((prev) => ({
      ...prev,
      accessLevels: prev.accessLevels.includes(level)
        ? prev.accessLevels.filter((l) => l !== level)
        : [...prev.accessLevels, level],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || form.accessLevels.length === 0) {
      errorToaster(
        "Please fill all fields and select at least one access level."
      );
      return;
    }

    try {
      await axios.post("/software/create", form);
      successToaster("Software created successfully!");
      setForm({ name: "", description: "", accessLevels: [] });
    } catch (err) {
      errorToaster(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Create New Software</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Access Levels</label>
          <div className="flex gap-4">
            {accessOptions.map((level) => (
              <label key={level} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={form.accessLevels.includes(level)}
                  onChange={() => handleCheckbox(level)}
                />
                {level}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Software
        </button>
      </form>
    </div>
  );
};

export default CreateSoftware;
