import React from "react";
import { Link } from "react-router-dom";
import "../navbar/navbar.css";

export const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
            {}
          </li>
          <li>
            <Link to="/about">About Me</Link>
            {}
          </li>
          <li>
            <Link to="/projects">Projects</Link>
            {}
          </li>
          <li>
            <Link to="/contact">Contact</Link>
            {}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
