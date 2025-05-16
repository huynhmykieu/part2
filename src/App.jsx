import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPerson(response.data);
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

  const onHandleSubmitName = (event) => {
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

    if(!newName || !newNumber) {
      alert("Please fill in both name and number");
      return;
    }
    
    axios
      .post("http://localhost:3001/persons", newObj)
      .then((response) => {
        setPerson(person.concat(response.data));
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
        onHandleSubmitName={onHandleSubmitName}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </>
  );
}

export default App;
