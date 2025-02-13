import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Home from "../pages/homepage/home";
import AboutMe from "../pages/aboutmepage/aboutme";
import Projects from "../pages/projectspage/projects";
import Contact from "../pages/contactspage/contacts";
import "../app/app.css";

export default function App() {
  return (
    <Router basename="/portfolio/">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
