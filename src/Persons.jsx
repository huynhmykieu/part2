import React from "react";

export default function Persons({ filterPersons }) {
  return (
    <div>
      {filterPersons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  );
}
