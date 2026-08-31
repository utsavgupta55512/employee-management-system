import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">E</div>
        <h2>EmployeeHub</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/add-employee">Add Employee</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
