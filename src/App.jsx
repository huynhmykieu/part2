import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import "./App.css";

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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

    if (!newName || !newNumber) {
      alert("Please fill in both name and number");
      return;
    }

    const existingPerson = person.find((p) => p.name === newName);
    if (existingPerson) {
      const ok = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (ok) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber,
        };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPerson(
              person.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
            setErrorMessage(
              `${returnedPerson.name} updated ${returnedPerson.number}`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((err) => console.log("Fail to update phonebook", err));
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .createPerson(newPerson)
      .then((returnPerson) => {
        setPerson([...person, returnPerson]);
        setNewName("");
        setNewNumber("");
        setErrorMessage(`Added ${returnPerson.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((err) => console.log("Fail to create a new phonebook", err));
  };

  const filterPersons = person.filter(
    (p) => p.name && p.name.toLowerCase().includes(newFilterName.toLowerCase())
  );

  const deletePerson = (id) => {
    const personToDelete = person.find((p) => p.id === id);
    if (!personToDelete) return;

    const confirmDelete = confirm(`Delete ${personToDelete.name}?`);
    if (!confirmDelete) return;

    personService
      .deletePerson(id)
      .then(() => {
        setPerson(person.filter((p) => p.id !== id));
        setErrorMessage(`Deleted ${personToDelete.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((err) => console.log("Fail to delete a phonebook", err));
  };

  return (
    <>
      <h2>Phonebook</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter onHandleChangeFilterName={onHandleChangeFilterName} />
      <h2>add a new</h2>
      <PersonForm
        onHandleChangeName={onHandleChangeName}
        onHandleChangeNumber={onHandleChangeNumber}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} deletePerson={deletePerson} />
    </>
  );
}

export default App;
