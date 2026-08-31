import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ search, setSearch }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar
          search={search}
          setSearch={setSearch}
        />

        <main className="page-content">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}

export default Layout;