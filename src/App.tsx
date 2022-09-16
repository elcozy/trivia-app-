import React from "react";
import "./App.css";
import { Categories } from "./components/Categories";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CategoryPage } from "./components/CategoryPage";
function App() {
  return (
    <Router>
      <div className="App">
        <header>Trivia App</header>
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        <footer>Trivia App Footer</footer>
      </div>
    </Router>
  );
}

export default App;
