import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567" },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const agregar = (event) => {
    let bandera = true
    event.preventDefault()
    persons.forEach(person =>{
      if (person.name.toLowerCase() == newName.toLowerCase()){
        bandera = false
      }
    })
    if (bandera == false){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName("")
    setNewNumber("")
  }

  const nuevoNombre = (event) => {
    setNewName(event.target.value)
  }

  const nuevoNumero = (event) => {
    setNewNumber(event.target.value)
  }

  const nuevoFiltro = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter == ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter valor={newFilter} controlador={nuevoFiltro}/>
      <h2>add a new</h2>
      <PersonForm controladorForm={agregar} estadoName={newName} estadoNum={newNumber} controladorName={nuevoNombre} controladorNum={nuevoNumero}/>
      <h2>Numbers</h2>
      <Persons filtrado={personsToShow}/>
    </div>
  )
}

export default App