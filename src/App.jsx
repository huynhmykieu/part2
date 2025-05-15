import { useState } from "react";

function App() {
  const [person, setPerson] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onHandleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onHandleChangeNumber = () => {
    setNewNumber(event.target.value);
  };

  const onHandleSubmitName = (event) => {
    event.preventDefault();
    const newNameObj = {
      name: newName,
      number: newNumber,
    };

    if (person.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPerson([...person, newNameObj]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={onHandleSubmitName}>
        <div>
          name: <input value={newName} onChange={onHandleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onHandleChangeNumber} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {person.map((p, i) => (
        <div key={i}>
          {p.name} {p.number}
        </div>
      ))}
    </>
  );
}

export default App;
