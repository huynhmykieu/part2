import React from "react";

export default function PersonForm({ newName, newNumber, onHandleChangeName, onHandleChangeNumber, onHandleSubmitName }) {
  return (
    <form onSubmit={onHandleSubmitName}>
      <div>
        name: <input value={newName} onChange={onHandleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onHandleChangeNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
}
