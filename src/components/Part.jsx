import React from "react";

export default function Part({ part, exercisesSum }) {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
}
