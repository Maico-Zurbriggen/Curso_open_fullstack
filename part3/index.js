require('dotenv').config() //Importamos esta libreria para poder trabajar con variables de entorno que se encuentran en el archivo .env
const express = require('express') //Importamos la libreria express que nos permite trabajar con el backend, con mayor facilidad al respoder a las solicitudes HTTP
const morgan = require('morgan')
const cors = require('cors') //Con cors podemos permitir solicitudes desde otros origenes distintos al de nuestro servidor

const app = express() //Creamos una aplicacion express

const Contact = require('./models/contact') //Importamos el esquema para trabajar con la base de datos

app.use(express.static('dist')) //Con esto habilitamos a express para que muestre el contenido estatico
app.use(express.json()) //Con esto podemos acceder al body de las solicitudes HTTP para saber que debemos agregar a la base de datos

morgan.token('body', (request) => { //Creamos un token para el middleware morgan de el body de la solicitud hecho en formato de texto
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :response-time ms - :body')) //Utilizamos el middleware morgan, nos permite obtener datos de las solicitudes HTTP realizadas, lo usamos para acceder al momento en el que se realizo la solicitud para la ruta /info

app.use(cors()) //Usamos el middleware cors

let cantidad = 0

app.get('/api/persons', (request, response) => { //Creamos una ruta para obtener todos los resultados de la base de datos
    Contact.find({}).then(result => {
        cantidad = result.length
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => { //Creamos una ruta para obtener un resultado de la base de datos por su id
    Contact.findById(request.params.id).then(result =>{
        if (result) {
            response.json(result)
        } else {
            response.status(404).end() 
        }
    })
    .catch(error => next(error)) //Llamamos al controlador de errores
})

app.post('/api/persons', (request, response, next) => { //Creamos una ruta para agregar un nuevo contacto a la base de datos
    const body = request.body

    const contact = new Contact({
        name: body.name,
        number: body.number,
    })
    contact.save()
    .then(result => {
        response.json(result)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => { //Creamos una ruta para actualizar el numero de una persona que ya esta agendada
    const body = request.body

    const contact = {
        number: body.number
    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators: true, context: 'query' } /*Este parámetro (new:true) sirve para 
    que updateContact reciba el valor actualizado no el antiguo y los otros dos son para que se tengan en cuenta las validaciones del esquema*/)
    .then(updateContact => {
        response.json(updateContact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => { //Creamos una ruta para eliminar un resultado de la base de datos por su id
    Contact.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    let fecha = Date.now()
    fecha = new Date(fecha)
    response.send(`<p>Phonebook has info for ${cantidad} people</p><p>${fecha}</p>`)
})

const errorHandler = (error, request, response, next) => { //Creamos el controlador de errores
    console.error(error)
  
    if (error.name === 'CastError') { //Verificamos si el error se da porque el id tiene un formato incorrecto
      return response.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError'){ //Verificamos si es un error de validacion
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler) //Llamamos al middleware del controlador de errores

const PORT = process.env.PORT || 3001 //Definimos el puerto
app.listen(PORT, () => { //Iniciamos el servidor con el puerto definido
    console.log(`Server running in port ${PORT}`)
})