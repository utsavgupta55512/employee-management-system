import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<Edit />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;