import { useState } from "react";

function App() {
  const [person, setPerson] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onHandleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onHandleSubmitName = (event) => {
    event.preventDefault();
    const newNameObj = {
      name: newName,
    };

    if (person.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    setPerson([...person, newNameObj]);
    setNewName("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={onHandleSubmitName}>
        <div>
          name: <input value={newName} onChange={onHandleChangeName} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {person.map((p, i) => (
        <div key={i}>{p.name}</div>
      ))}
    </>
  );
}

export default App;
