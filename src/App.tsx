import React from "react";
import "./App.css";
import { Categories } from "./components/Categories";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CategoryPage } from "./components/CategoryPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/users" element={<div>Users</div>} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="*" element={<div>PAge not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
