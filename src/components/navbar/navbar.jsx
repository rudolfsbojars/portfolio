import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="navbar-section">
      <header>
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>

          <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            &#9776;
          </div>
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
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
