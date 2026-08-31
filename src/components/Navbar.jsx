function Navbar({search, setSearch}) {
  return (
    <header className="navbar">
      <div className="navbar-left">
      <h2>Employee Management</h2>
      <input
      type="text"
      placeholder="Search Employees..."
      className="navbar-search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      ></input>
      </div>

      <div className="navbar-user">
        <span className="notification">🔔</span>
        <div className="user-avatar">U</div>
        <span className="user-name">Utsav</span>
      </div>
    </header>
  );
}

export default Navbar;