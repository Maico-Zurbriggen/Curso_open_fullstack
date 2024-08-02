import { useState, useEffect } from 'react'

import axios from 'axios'

import services from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState([null, null])

  useEffect(() => {
    services.getAll()
    .then(respuesta => {setPersons(respuesta)})
  }, [])

  const wait = () => {
    setTimeout(() => {
      setMessage([null, null])
    }, 5000)
  }

  const agregar = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name.toLowerCase() == newName.toLowerCase())){
      if(window.confirm((`${newName} is already added to phonebook, replace the old number with a new one?`))){
        const personaModificar = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        services.update(personaModificar.id, {...personaModificar, number: newNumber})
        .then(respuesta => {setPersons(persons.map(person => person.id !== personaModificar.id ? person : respuesta))
          setMessage([`Modified ${respuesta.name}`, 'exito'])
        })
        .catch(error => {
          console.log(error.response.status)
          setMessage([`Number validation not passed`, 'error'])
        })
        wait()
      }
    }else{
      services
      .create({name: newName, number: newNumber})
      .then(agregado => {
        setPersons(persons.concat(agregado))
        setMessage([`added ${agregado.name}`, 'exito'])})
      .catch(error => {
        console.log(error.response.data.error)
        setMessage([`Validation did not pass`, 'error'])
      })
    }
    wait()
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

  const eliminar = (id, name) => {
    if(window.confirm(`¿Delete ${name}?`)){
      services.deleted(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const personsToShow = newFilter == ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification mensaje={message[0]} tipo={message[1]}/>
      <Filter valor={newFilter} controlador={nuevoFiltro}/>
      <h2>add a new</h2>
      <PersonForm controladorForm={agregar} estadoName={newName} estadoNum={newNumber} controladorName={nuevoNombre} controladorNum={nuevoNumero}/>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => <Person key={person.id} nombre={person.name} numero={person.number} eliminar={() => eliminar(person.id, person.name)}/>)}
      </div>
    </div>
  )
}

export default App