import React from "react";
import { First } from "../first/first.jsx";
import { Skills } from "../skills/skills.jsx";
import "../app/app.css";

export default function Home() {
  return (
    <>
      <main className="content-wrapper">
        <First />
        <Skills />
      </main>
    </>
  );
}
