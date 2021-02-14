const express = require("express");
const formidable = require('express-formidable');
const serviceLogin = require("./servicios/login")

var app = express();
app.use(formidable());
app.use(express.static("public"))

let service = require("./servicios/servicioGuardado");
const PORT = 3000;

app.get("/api/personajes", (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    if (token == "undefined") {
        return res.status(403).send({ success: false, mensaje: "No tienes autorizacion" })
    }
    res.status(200).send({ success: true, personajes: service.getPersonajes() });
})

app.get("/api/personajes/:id", (req, res) => {
    const persona = service.getPersonaje(req.params.id)
    if (!persona) {
        return res.status(404).send({ success: false, mensaje: "No se ha encontrado el personaje" })
    }
    res.send({ personaje: persona, success: true, mensaje: "Se ha encontrado correctamente" })
})

app.post("/api/personaje", (req, res) => {
    let personaje = req.fields

    if (!personaje.nombre || !personaje.especie || !personaje.actor) {
        return res.status(422).send({ success: false, mensaje: "Falta algún campo" })
    }

    let personajeFinal = getPersonajeFormateado(personaje)
    service.addPersonaje(personajeFinal)
    res.status(201).send({ success: true, mensaje: "El personaje se ha recibido con éxito" })
})

app.put("/api/personajes/:id", (req, res) => {
    let id = req.params.id
    filtro = service.getPersonajes().filter(personaje => personaje.id == id)
    if (!filtro.length) {
        return res.status(404).send({ success: false, mensaje: "El personaje no existe" })
    }
    let personaje = filtro[0]
    let personajeCambios = getPersonajeFormateado(req.fields)
    mergeRecursive(personaje, personajeCambios)
    res.status(200).send({ success: true, mensaje: "El personaje se ha modificado con éxito" })
})

app.delete("/api/personajes/:id", (req, res) => {
    const id = req.params.id
    const p = service.deletePersonaje(id)
    if (!p) {
        return res.status(404).send({ success: false, mensaje: "No se ha encontrado el personaje" })
    }
    res.status(200).send({ success: true, mensaje: "El personaje se ha eliminado correctamente", personaje: p })
})

app.post("/api/login", (req, res) => {
    let usuario = req.fields
    if (!serviceLogin.loginCorrecto(usuario)) {
        res.status(500).send({ success: false, mensaje: "Error al logearte" })
    }
    res.status(200).send({
        success: true,
        mensaje: "Te has logeado correctamente",
        token: serviceLogin.crearToken()
    })
})

app.listen(PORT, () => {
    console.log("api rest corriendo en el puerto 3000");
})

const getPersonajeFormateado = (personaje) => {
    if (Object.keys(personaje).includes("vivo")) {
        personaje.vivo = true
    } else {
        personaje.vivo = false
    }
    if (Object.keys(personaje).includes("estudianteHogwarts")) {
        personaje.estudianteHogwarts = true
    } else {
        personaje.estudianteHogwarts = false
    }
    personaje.varita = {
        madera: personaje.madera,
        nucleo: personaje.nucleo,
        tamanho: personaje.tamanho
    }
    delete personaje.madera
    delete personaje.nucleo
    delete personaje.tamanho
    if (personaje.id) {
        personaje.id = parseInt(personaje.id)
    } else {
        personaje.id = service.getProximoId()
    }

    return personaje
}

const mergeRecursive = (perViejo, perNuevo) => {
    for (let p in perNuevo) {
        try {
            if (perNuevo[p].constructor == Object) {
                perViejo[p] = mergeRecursive(perViejo[p], perNuevo[p])
            } else {
                perViejo[p] = perNuevo[p]
            }
        } catch (error) {
            perViejo[p] = perNuevo[p]
        }
    }
    return perViejo
}