import { useState,useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response=> {
      setPersons(response.data)
    })
  },[])

  const addPerson = (event) =>{
    event.preventDefault()
    const nameExists = persons.some(person=>person.name===newName)
    const numberExists = persons.some(person=>person.number===newNumber)
    if(numberExists && nameExists){
      alert(`${newName} with ${newNumber} is already added to the phonebook`)
      return
    }
    const personObject = {
      name : newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }



  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      value ={search} 
      handleSearchChange = {handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
      filteredPersons={filteredPersons}
      />
    </div>
  ) 
}

export default App