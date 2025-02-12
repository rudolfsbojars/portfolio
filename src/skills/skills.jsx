import React from "react";
import "../skills/skills.css";

export const Skills = () => {
  return (
    <div className="skills-container">
      <h2 className="skills-title">Programming Languages I Know</h2>
      <div className="skills-logos">
        <div className="logo-item">
          <img src="/path/to/mql5-logo.png" alt="MQL5 Logo" className="logo" />
          <p>MQL5</p>
        </div>
        <div className="logo-item">
          <img
            src="/path/to/react-logo.png"
            alt="React Logo"
            className="logo"
          />
          <p>React</p>
        </div>
        <div className="logo-item">
          <img src="/path/to/csharp-logo.png" alt="C# Logo" className="logo" />
          <p>C#</p>
        </div>
        <div className="logo-item">
          <img
            src="/path/to/python-logo.png"
            alt="Python Logo"
            className="logo"
          />
          <p>Python</p>
        </div>
      </div>
    </div>
  );
};
