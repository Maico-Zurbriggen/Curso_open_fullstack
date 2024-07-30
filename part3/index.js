const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())

morgan.token('body', (request) => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :response-time ms - :body'));

app.use(cors())

let datos = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 1001)
}

app.get('/api/persons', (request, response) => {
    response.json(datos)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = datos.find(person => person.id === parseInt(id))
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(404).json({
            error: "content missing"
        })
    }

    if(datos.some(person => person.name.toLowerCase() === body.name.toLowerCase())){
        return response.status(404).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    datos = datos.filter(person => person.id !== parseInt(id))
    response.status(204).end()
})

app.get('/info', (request, response) => {
    let fecha = Date.now()
    fecha = new Date(fecha)
    response.send(`<p>Phonebook has info for ${datos.length} people</p><p>${fecha}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})