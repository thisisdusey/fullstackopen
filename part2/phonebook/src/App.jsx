import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Filter from "./components/Filter";
import phonebookService from "./services/phonebookService";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    // const person = persons.find(p=>p.id===id)
    // const changedPerson = { ...person, number: newNumber}
    // const numberExists = persons.some(person=>person.number===newNumber)

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phonebookService
          .update(existingPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
          })

          .catch((error) => {
            alert(
              `The person '${existingPerson.name}' was already deleted from the server.`
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }

    phonebookService
      .create(personObject) // POST request to create a new person
      .then((response) => {
        setPersons(persons.concat(response.data)); // Add the new person to state
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        alert("Error adding person to the phonebook.");
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          alert(
            `The person '${person.name}' was already deleted from the server.`
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={search} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person handleDelete={handleDelete} filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
