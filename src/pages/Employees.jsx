import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();
  const { search } = useOutletContext();
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [employees, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      });
  }, []);

  function confirmDelete(id) {
    setDeleteId(id);
    setShowConfirm(true);
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    });

    setEmployee(employees.filter((emp) => emp.id !== id));
    setShowConfirm(false);
    setDeleteId(null);
  }

  function handleEdit(id) {
    navigate(`/edit-employee/${id}`);
  }

  if (loading) {
    return <h2 className="loading-text">Loading employees...</h2>;
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      emp.department.toLowerCase() === department.toLowerCase();

    const matchesStatus = status === "All" || emp.status === status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const sortedEmployees = [...filteredEmployees];
  if (sortOption === "salary-low") {
    sortedEmployees.sort((a, b) => Number(a.salary) - Number(b.salary));
  }

  if (sortOption === "salary-high") {
    sortedEmployees.sort((a, b) => Number(b.salary) - Number(a.salary));
  }

  if (sortOption === "name-asc") {
    sortedEmployees.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOption === "name-dec") {
    sortedEmployees.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <p className="dashboard-label">TEAM</p>
          <h1>Employees</h1>
          <p>Manage and view all employees in your organization.</p>
        </div>

        <div>
          <select
            className="department-filter"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Pharma">Pharma</option>
          </select>
        </div>

        <div>
          <select
            className="status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <select
            className="sort-filter"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="name-asc">Name A - Z</option>
            <option value="name-dec">Name Z - A</option>
            <option value="salary-low">Salary Low - High</option>
            <option value="salary-high">Salary High - Low</option>
          </select>
        </div>

        <button
          className="add-employee-btn"
          onClick={() => navigate("/add-employee")}
        >
          + Add Employee
        </button>
      </div>

      {showConfirm && (
        <div className="confirm-box">
          <div className="confirm-modal">
            <h3>Delete Employee</h3>

            <p>Are you sure you want to delete this employee?</p>

            <div className="confirm-actions">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>

              <button onClick={() => handleDelete(deleteId)}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="employee-info">
                      <div className="employee-avatar">
                        {emp.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{emp.name}</strong>
                        <span>ID: #{emp.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{emp.email}</td>

                  <td>{emp.phone}</td>

                  <td>
                    <span className="department-badge">{emp.department}</span>
                  </td>

                  <td>₹{Number(emp.salary).toLocaleString("en-IN")}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        emp.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(emp.id)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => confirmDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
