import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <section className="navbar-section">
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
              <Link to="/about">AboutMe</Link>
              {}
            </li>
            <li>
              <Link to="/projects">Projects</Link>
              {}
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Navbar;
