import React from "react";
import "./projects.css";

const projectData = [
  {
    name: "Modeling Tool",
    description:
      "A 3D Modeling tool with limited ability, made with three.js, that connects with Fusion CAD application for proccessing and further cutting operations",
    logo: "reactlogo.png",
    action: "In Development",
  },
  {
    name: "Video Player",
    description:
      "A video player developed in C# with features such as theme switching, subtitle loading & display, and playlist creation.",
    logo: "clogo.webp",
    downloadLink: "https://bunkursserver.com/PortfolioFiles/MediaPlayer.exe",
    action: "Download",
  },
  {
    name: "Info System",
    description:
      "A C# and PSQL-based hospitality and restaurant information system that includes features like restaurant layout visualization, order management, inventory tracking, and more. Login-admin Pass-admin",
    logo: "clogo.webp",
    downloadLink:
      "https://bunkursserver.com/PortfolioFiles/Hospitality_Information_System.exe",
    action: "Download",
  },
  {
    name: "Expert Advisor",
    description:
      "Automated trading system that integrates several technical analysis indicators, risk management tools, and trade management functions. One of the larger projects i have made. Launchable with the MetaTrader5 Application.",
    logo: "mt5.png",
    downloadLink: "https://bunkursserver.com/PortfolioFiles/KIX_PRIME.zip",
    action: "Download",
  },
  {
    name: "Heat Map",
    description:
      "Indiactor that sorts and shows historical price levels and their weight. Launchable with the MetaTrader5 Application.",
    logo: "mt5.png",
    downloadLink: "https://bunkursserver.com/PortfolioFiles/TickLevels.mq5",
    action: "Download",
  },
  {
    name: "Portfolio",
    description:
      " This Webpage made in three.js that uses a glb model, and other technologies like routers.",
    logo: "reactlogo.png",
    downloadLink: "https://github.com/rudolfsbojars/portfolio",
    action: "View in my GitHub",
  },
];

const ProjectCard = ({ name, description, logo, downloadLink, action }) => {
  return (
    <div className="project-card">
      <div className="project-logo">
        <img src={logo} alt={`${name} Logo`} />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <a href={downloadLink} className="download-link">
        {action}
      </a>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="projects-container">
      <div className="projects-content">
        <h1>A few of my Projects</h1>

        <div className="projects-grid">
          {projectData.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              description={project.description}
              logo={project.logo}
              downloadLink={project.downloadLink}
              action={project.action}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
