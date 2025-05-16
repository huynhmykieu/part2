import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");

  useEffect(() => {
    personService
      .getPersons()
      .then((initialPerson) => {
        setPerson(initialPerson);
      })
      .catch((err) => console.log("Fail to get phonebook data", err));
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

  const addPerson = (event) => {
    event.preventDefault();
    const newObj = {
      name: newName,
      number: newNumber,
    };

    if (person.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    if (!newName || !newNumber) {
      alert("Please fill in both name and number");
      return;
    }

    personService
      .createPerson(newObj)
      .then((returnPerson) => {
        setPerson([...person, returnPerson]);
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => console.log("Fail to create a new phonebook", err));
  };

  const filterPersons = person.filter(
    (p) => p.name && p.name.toLowerCase().includes(newFilterName.toLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <Filter onHandleChangeFilterName={onHandleChangeFilterName} />
      <h2>add a new</h2>
      <PersonForm
        onHandleChangeName={onHandleChangeName}
        onHandleChangeNumber={onHandleChangeNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </>
  );
}

export default App;
