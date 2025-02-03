import React from "react";
import "../navbar/navbar.css";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Projects</a>
        </li>
        <li>
          <a>CV</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
