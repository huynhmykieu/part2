import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPerson(response.data);
    });
  }, []);

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
