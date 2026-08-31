import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    status: "Active",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/employees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormdata(data);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    await response.json();
  
    navigate("/employees");
  }

 
  return (
    <div>
      <h1>Edit Employee</h1>
      <EmployeeForm
      formdata={formdata}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      buttonText="update employee"
      ></EmployeeForm>
    </div>
  );
}
export default Edit;
