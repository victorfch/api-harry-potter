let personajes = require("../personajes")

const getPersonajes = () => personajes
const addPersonaje = (personaje) => personajes = [personaje, ...personajes]
const getPersonaje = (id) => personajes.find(p => id == p.id)
const deletePersonaje = (id) => {
    const indice = personajes.findIndex(personaje => id == personaje.id)
    if (indice == -1) {
        return 0
    }
    return personajes.splice(indice, 1)
}
const getProximoId = () => {
    if (!personajes.length) {
        return 0
    }
    return personajes[0].id
}

module.exports = {
    getPersonajes,
    addPersonaje,
    getPersonaje,
    deletePersonaje,
    getProximoId
}