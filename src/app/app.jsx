import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Three } from "../three/three.jsx";
import { Navbar } from "../navbar/navbar.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Three />
    </>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<App />);
