import React from "react";
import "../navbar/navbar.css";

export const Navbar = () => {
  return (
    <header>
      <nav>
        <div class="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About Me</a>
          </li>
          <li>
            <a>Projects</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
