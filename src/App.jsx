import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployees";
import Layout from "./components/Layout";
import Edit from "./pages/Edit";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Routes>

        <Route
          element={
            <Layout
              search={search}
              setSearch={setSearch}
            />
          }
        >
           <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<Edit />} />
           <Route path="*" element={<h2>Page not found</h2>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;