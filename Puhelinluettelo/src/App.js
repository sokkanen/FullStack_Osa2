import React, {useState, useEffect} from 'react';
import FilterPersons from './components/FilterPersons'
import PersonAlreadyAdded from './components/PersonAlreadyAdded'
import Person from './components/Person'
import personService from './services/persons.js'
import Notification from './components/Notification.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [msgText, setMsgText] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  }, [])

  const changeNewNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const changeNewNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilterHandler = (event) => {
    setFilter(event.target.value)
    setFilteredPersons(FilterPersons(event.target.value, persons))
  }

  const notify = (text) => {
    setMsgText(text)
    setTimeout(() => {
      setMsgText('')
    }, 5000);
  }

  const addOrModifyEntry = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (PersonAlreadyAdded(persons, newName)){
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)){
        const oldPerson = persons.filter(pers => pers.name === person.name)[0]
        person.id = oldPerson.id
        personService
        .modifyPersonInDb(person)
        .then(response => {
            setPersons(persons.map(pers => pers.id !== persons.id ? pers : response.data))
            setFilteredPersons(persons.map(pers => pers.id !== persons.id ? pers : response.data))
        })
        .then(notify(`${person.name} muokattu.`))
        .catch(error => {
          setPersons(persons.filter(pers => pers.id !== person.id))
          setFilteredPersons(persons.filter(pers => pers.id !== person.id))
          notify(`Henkilön ${person.name} tietoja ei löydy tietokannasta.`)
        })
      }
      setNewName('')
      setNewNumber('')
    } else {
      personService
      .newPersonToDb(person)
      .then(response => {
        person.id = response.data.id
      })
      const newPersons = persons.concat(person)
      setPersons(newPersons)
      setFilteredPersons(newPersons)
      setNewName('')
      setNewNumber('')
      notify(`${person.name} tallennettu.`)
    }
  }

  const removeEntry = (person) => {
    if (window.confirm(`Poistetaanko ${person.name} ?`)){
    personService.removePersonFromDb(person.id)
    const newPersons = persons.filter(pers => pers.name !== person.name)
    setPersons(newPersons)
    setFilteredPersons(newPersons)
    notify(`${person.name} poistettu.`)
    }
  }

  return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={msgText}/>
        <div>
          rajaa näytettäviä: <input
          value={filter}
          onChange={changeFilterHandler}
          />
        </div>
        <h3>Lisää uusi</h3>
        <form onSubmit={addOrModifyEntry}>
          <div>
            nimi: <input 
            value={newName} 
            onChange={changeNewNameHandler}
            />
          </div>
          <div>
            numero: <input 
            value={newNumber} 
            onChange={changeNewNumberHandler}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h3>Numerot</h3>
        {filteredPersons.map(person => 
        <Person 
        key={person.name} 
        person={person}
        handler={removeEntry}
        />)}
      </div>
  )
}

export default App
