import React from "react";
import "./App.css";
import { Categories } from "./components/Categories";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CategoryPage } from "./components/CategoryPage";
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <header>Trivia App</header>
          <Link to="/">Home</Link>
          <Link to="#">How To Play</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/how-to-play" element={<div>How to Play</div>} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        <footer>Trivia App Footer</footer>
      </div>
    </Router>
  );
}

export default App;
