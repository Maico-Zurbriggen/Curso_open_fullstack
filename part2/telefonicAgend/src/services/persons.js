import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(respuesta => respuesta.data)
}

const create = newPerson => {
    const request = axios.post(baseURL, newPerson)
    return request.then(respuesta => respuesta.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseURL}/${id}`, newPerson)
    return request.then(respuesta => respuesta.data)
}

const deleted = id => {
    axios.delete(`${baseURL}/${id}`)
}

export default {getAll, create, update, deleted}