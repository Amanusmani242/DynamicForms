import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DynamicForm from "./components/DynamicForm";
import DataTable from "./components/DataTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Background4 from "./components/Images/Background4.jpg";
function App() {
  const [submittedData, setSubmittedData] = useState([]);
  const [editData, setEditData] = useState(null);

  const handleFormSubmit = ({ data, type }) => {
    if (editData !== null) {
      setSubmittedData((prevData) =>
        prevData.map((entry, index) => (index === editData.index ? { type, data } : entry))
      );
      setEditData(null);
    } else {
      setSubmittedData((prevData) => [...prevData, { type, data }]);
    }
  };

  const handleEdit = (index) => {
    setEditData({ index, ...submittedData[index] });
  };

  const handleDelete = (index) => {
    setSubmittedData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${Background4})`, // Replace with your image path
        backgroundSize: "cover", // Ensure the image covers the full screen
        backgroundPosition: "center", // Center the background image
        backgroundAttachment: "fixed", // Keep the background fixed during scroll
      }}
    >
      <Header />
      <main className="flex-grow">
        <DynamicForm onSubmit={handleFormSubmit} editData={editData} />
        {submittedData.length > 0 && (
          <DataTable data={submittedData} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
