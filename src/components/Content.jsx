import React from "react";
import Part from "./Part";

export default function Content({ parts }) {
  const exercisesSum = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map((part) => {
        return <Part part={part} key={part.id} />;
      })}
      <p>
        <strong>total of {exercisesSum}</strong>
      </p>
    </div>
  );
}
