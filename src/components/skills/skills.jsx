import React from "react";
import "./skills.css";
import { Link } from "react-router-dom";

export const Skills = () => {
  return (
    <div className="skills">
      <div className="skills-container">
        <h2 className="skills-title">Programming Languages</h2>
        <div className="skills-middle">
          <h3>
            These are the programming languages i have used the most, but not
            limited to, am always open to learn more
          </h3>
        </div>
        <div className="skills-logos">
          <div className="logo-item">
            <img src="mt5.png" alt="MQL5 Logo" className="logo" />
            <p>MQL5</p>
          </div>
          <div className="logo-item">
            <img src="reactlogo.png" alt="React Logo" className="logo" />
            <p>React</p>
          </div>
          <div className="logo-item">
            <img src="clogo.webp" alt="C# Logo" className="logo" />
            <p>C#</p>
          </div>
          <div className="logo-item">
            <img src="pythonlogo.webp" alt="Python Logo" className="logo" />
            <p>Python</p>
          </div>
        </div>
        <div className="skills-link">
          <h3>
            Take a look at where I have used them in the
            <Link to="/projects" className="highlighted-link">
              <span> →projects page</span>
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
