import { useState,useEffect } from "react";


function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/employees")
    .then((res)=>res.json())
    .then((data)=> {
      setEmployees(data);
    })
  },[]);
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Welcome back, Utsav. Here's what's happening with your employees.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div>
            <p>Total Employees</p>
            <h2>{employees.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <p>Active Employees</p>
            <h2>{employees.filter((emp)=>emp.status === "Active").length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">!</div>
          <div>
            <p>Inactive Employees</p>
            <h2>{employees.filter((emp)=>emp.status === "Inactive").length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">▦</div>
          <div>
            <p>Departments</p>
            <h2>
              {new Set(employees.map((emp)=> emp.department)).size}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;