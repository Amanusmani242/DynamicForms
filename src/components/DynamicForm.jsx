import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Background3 from './Images/Background4.jpg'; // Ensure this path is correct

// Validation function
const validateField = (key, value) => {
  if (!value) return `${key} is required.`;

  if (key === "age" && (value < 1 || value > 120)) {
    return `${key} must be between 1 and 120.`;
  }
  if (key === "zipCode" && !/^\d{6}$/.test(value)) {
    return `${key} must be a 6-digit number.`;
  }
  if (key === "cardNumber" && !/^\d{16}$/.test(value)) {
    return `${key} must be a 16-digit number.`;
  }
  if (key === "expiryDate") {
    const currentDate = new Date();
    const inputDate = new Date(value);
    if (inputDate <= currentDate) {
      return `${key} must be a valid future date.`;
    }
  }
  if (key === "cvv" && !/^\d{3}$/.test(value)) {
    return `${key} must be a 3-digit number.`;
  }
  return null;
};

const DynamicForm = ({ onSubmit, editData }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [formType, setFormType] = useState("");
  const [progress, setProgress] = useState(0);

  const apiResponses = {
    userInfo: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: true },
    ],
    address: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
      { name: "zipCode", type: "text", label: "Zip Code", required: true },
    ],
    payment: [
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
    ],
  };

  useEffect(() => {
    if (editData) {
      setFormType(editData.type);
      setFields(apiResponses[editData.type]);
      setFormData(editData.data);
    }
  }, [editData]);

  const handleDropdownChange = (selection) => {
    setFormType(selection);
    setFields(apiResponses[selection]);
    setFormData({});
    setErrors({});
    setProgress(0);
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    const updatedData = { ...formData, [field.name]: value };
    setFormData(updatedData);

    const error = validateField(field.name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field.name]: error }));

    const requiredFields = fields.filter((f) => f.required);
    const filledFields = requiredFields.filter((f) => updatedData[f.name]?.trim());
    setProgress((filledFields.length / requiredFields.length) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = fields.every((field) => !formData[field.name]?.trim());

    if (isEmpty) {
      toast.error("Cannot submit an empty form. Please fill out the required fields.");
      return;
    }

    const validationErrors = {};
    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) validationErrors[field.name] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix validation errors before submitting.");
    } else {
      onSubmit({ data: formData, type: formType });
      toast.success(editData ? "Changes saved successfully!" : "Form submitted successfully!");
      setFormData({});
      setFields([]);
      setProgress(0);
    }
  };

  return (
    <div
      className="p-6 max-w-4xl mx-auto"
      style={{
        backgroundImage: `url(${Background3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100%",
      }}
    >
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none">
          {formType || "Select Form Type"}
          <ChevronDownIcon className="h-5 w-5 text-white" />
        </MenuButton>
        <MenuItems className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm text-white">
          {Object.keys(apiResponses).map((key) => (
            <MenuItem key={key}>
              {({ active }) => (
                <button
                  className={`block w-full px-4 py-2 text-left text-sm ${active ? "bg-gray-700 text-white" : "text-gray-300"}`}
                  onClick={() => handleDropdownChange(key)}
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4 bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-bold mb-1">{field.label}</label>
            {field.type === "dropdown" ? (
              <select
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full p-2 border rounded"
              />
            )}
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="h-4 bg-gray-200 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
        </div>

        <button type="submit" className="px-4 py-2 rounded text-white bg-blue-500">
          {editData ? "Save Changes" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
