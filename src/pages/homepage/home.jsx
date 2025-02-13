import React from "react";
import { Introduction } from "/src/components/introduction/introduction";
import { Skills } from "/src/components/skills/skills";
import "./home.css";

export default function Home() {
  return (
    <>
      <Introduction />
      <Skills />
    </>
  );
}
