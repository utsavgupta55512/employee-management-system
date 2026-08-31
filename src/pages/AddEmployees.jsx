import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

function AddEmployees() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    status: "Active",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formdata.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formdata.email.trim()) {
      setError("Email is required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formdata.email)) {
      setError("please enter a valid email");
      return;
    }

    if (!formdata.phone.trim()) {
      setError("phone no is required");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(formdata.phone)) {
      setError("please enter a valid phone number");
      return;
    }

    if (!formdata.department.trim()) {
      setError("Department is required");
      return;
    }

    if (!formdata.salary.trim()) {
      setError("salary is required");
      return;
    }

    const salary = Number(formdata.salary);

    if (isNaN(salary) || salary <= 0) {
      setError("salary must be a positive number");
      return;
    }

    const response = await fetch("http://localhost:5000/employees", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
  await response.json();

   
    setSuccess("Employee added successfully");
    setFormdata({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      status: "Active",
    });
  }

  return (
    <div>
      <h1>Add Employee</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <EmployeeForm
        formdata={formdata}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Add Employee"
      ></EmployeeForm>
    </div>
  );
}
export default AddEmployees;
