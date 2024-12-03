import React from "react";
import { toast } from "react-toastify";
import Background from "./Images/Background.jpg"; // Adjust the path to your image

const DataTable = ({ data, onEdit, onDelete }) => {
  const handleEditClick = (index) => {
    toast.info("You are editing a form.");
    onEdit(index);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      onDelete(index);
      toast.success("Form deleted successfully.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "8px",
      }}
      className="space-y-6"
    >
      {data.map((row, index) => (
        <div key={index} className="border p-4 rounded shadow-sm bg-white bg-opacity-80">
          <h2 className="text-xl font-bold mb-4">
            {row.type === "userInfo" && "User Information"}
            {row.type === "address" && "Address Information"}
            {row.type === "payment" && "Payment Information"}
          </h2>
          <div className="bg-gray-100 p-4 rounded">
            {Object.entries(row.data).map(([key, value]) => (
              <div key={key} className="mb-2">
                <span className="font-bold">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                </span>{" "}
                {value}
              </div>
            ))}
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleEditClick(index)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(index)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataTable;
