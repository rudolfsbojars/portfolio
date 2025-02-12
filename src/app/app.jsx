import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../navbar/navbar.jsx";
import { First } from "../first/first.jsx";
import { Skills } from "../skills/skills.jsx";
import "../app/app.css";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="content-wrapper">
        <First />
        <Skills />
      </main>
    </>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<App />);
