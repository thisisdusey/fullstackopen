import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Filter from "./components/Filter";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);


  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

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
            setNotificationMessage({
              message: `${newName} was updated successfully!`,
              type: "update",
            
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
    
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert("Error adding person to the phonebook.");
          });
      }
      return;
    }

    phonebookService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response));
        setNotificationMessage({ message: `${newName} was added successfully!`,
          type: "update",
        })
        setTimeout(() => setNotificationMessage(null), 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotificationMessage({
          message: error.response.data.error || "An error occurred!",
          type: "error"
        });
    setTimeout(() => setNotificationMessage(null), 5000);
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
          setNotificationMessage({ message: 'Successfully deleted!',
            type: "delete",
          })
          setTimeout(() => setNotificationMessage(null), 5000);
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
      <Notification message={notificationMessage?.message}
        type= {notificationMessage?.type}
      />
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
