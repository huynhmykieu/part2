import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

function App() {
  const [person, setPerson] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");

  const onHandleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onHandleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onHandleChangeFilterName = (event) => {
    setNewFilterName(event.target.value);
  };

  const onHandleSubmitName = (event) => {
    event.preventDefault();
    const newNameObj = {
      name: newName,
      number: newNumber,
      id: person.length + 1,
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

  const filterPersons = person.filter((p) =>
    p.name.toLowerCase().includes(newFilterName.toLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <Filter onHandleChangeFilterName={onHandleChangeFilterName} />
      <h2>add a new</h2>
      <PersonForm
        onHandleChangeName={onHandleChangeName}
        onHandleChangeNumber={onHandleChangeNumber}
        onHandleSubmitName={onHandleSubmitName}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </>
  );
}

export default App;
