import React from "react";
import "./aboutme.css";
import cvFileEng from "/src/assets/CV_RudolfsBojars_ENG.pdf";
import cvFileLv from "/src/assets/CV_RudolfsBojars_LV.pdf";

const AboutMe = () => {
  return (
    <section className="aboutme-container">
      <div className="aboutme-content">
        <h1>About Me</h1>
        <p>
          I’m a junior programmer seeking an internship with a strong focus on
          backend development. I’m passionate about problem-solving, especially
          in areas like data structures, algorithms, and security. I enjoy
          building reliable systems and optimizing their performance through
          thoughtful design.
        </p>

        <h3>Skills & Experience:</h3>
        <ul>
          <li>
            <strong>Programming Languages:</strong> C, C#, JavaScript, Python,
            React
          </li>
          <li>
            <strong>Low-Level Operations:</strong> Strong foundation in C and
            Linux system programming, including memory management, file systems,
            and performance optimization.
          </li>
          <li>
            <strong>Database Management:</strong> Experience with PostgreSQL and
            Oracle.
          </li>
          <li>
            <strong>Networking:</strong> CCNA certified, with a solid
            understanding of switching, routing, and wireless systems.
          </li>
        </ul>

        <p>
          I’m fluent in English, which enables me to communicate effectively
          across diverse teams and international projects. I’m always eager to
          learn, grow, and adapt as a developer, and I’m confident that my
          skills and attitude would make me a great addition to any team.
        </p>

        <div className="download-links">
          <a href={cvFileEng} download className="download-btn">
            Download My CV In ENG
          </a>
          <a href={cvFileLv} download className="download-btn">
            Download My CV In LV
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
