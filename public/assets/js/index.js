const PANEL = document.querySelector(".columns");
const URL_BASE = "/api"
const MODAL_FORM = document.querySelector("#modalForm")
const MODAL_VER = document.querySelector("#modalVer")
const PANEL_MENSAJE_EXITO = document.querySelector(".notification.is-success")
const PANEL_MENSAJE_ERROR = document.querySelector(".notification.is-danger")
const FORM_NUEVO_PERSONAJE = document.querySelector("#formAdd")
const TITULO_MODAL = document.querySelector(".modal-card-title")


const toggleModalForm = () => {
    FORM_NUEVO_PERSONAJE.reset()
    MODAL_FORM.classList.toggle("is-active")
}
const toggleModalVer = () => MODAL_VER.classList.toggle("is-active")

const eliminarPersonaje = (id) => {
    const eliminar = confirm("¿Estás seguro?")
    if (!eliminar) {
        return
    }
    fetch(`${URL_BASE}/personajes/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                toggleNotificacion(PANEL_MENSAJE_ERROR, data.mensaje)
                return
            }
            rellenarCartas()
            toggleNotificacion(PANEL_MENSAJE_EXITO, data.mensaje)
        })
}

const verPersonaje = (id) => {
    fetch(`${URL_BASE}/personajes/${id}`)
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                toggleNotificacion(PANEL_MENSAJE_ERROR, data.mensaje)
                return
            }
            const personaje = data.personaje
            const varita = Object.values(personaje.varita)
            MODAL_VER.innerHTML = renderModalVerPersonaje(personaje, varita)
            toggleModalVer()
        })
}

const nuevoPersonaje = () => {
    toggleModalForm()
    TITULO_MODAL.textContent = "Crear personaje"
}

const modificarPersonaje = (id) => {
    toggleModalForm()
    TITULO_MODAL.textContent = "Editar personaje"
    fetch(`${URL_BASE}/personajes/${id}`)
        .then(res => res.json())
        .then(data => {
            const personaje = data.personaje
            FORM_NUEVO_PERSONAJE.elements[0].value = personaje.id
            FORM_NUEVO_PERSONAJE.elements[1].value = personaje.nombre
            FORM_NUEVO_PERSONAJE.elements[2].value = personaje.especie
            FORM_NUEVO_PERSONAJE.elements[3].value = personaje.sexo
            FORM_NUEVO_PERSONAJE.elements[4].value = personaje.patronus
            FORM_NUEVO_PERSONAJE.elements[5].value = personaje.varita.madera
            FORM_NUEVO_PERSONAJE.elements[6].value = personaje.varita.nucleo
            FORM_NUEVO_PERSONAJE.elements[7].value = personaje.varita.tamanho
            FORM_NUEVO_PERSONAJE.elements[8].value = personaje.colorOjos
            FORM_NUEVO_PERSONAJE.elements[9].value = personaje.colorPelo
            FORM_NUEVO_PERSONAJE.elements[10].value = personaje.casa
            FORM_NUEVO_PERSONAJE.elements[11].value = personaje.actor
            FORM_NUEVO_PERSONAJE.elements[12].checked = personaje.vivo
            FORM_NUEVO_PERSONAJE.elements[13].checked = personaje.estudianteHogwarts
        })
}

const rellenarCartas = () => {
    const miHeader = new Headers()
    miHeader.append("authorization", `Bearer ${localStorage.token}`)
    const options = {
        method: "GET",
        headers: miHeader
    }
    fetch(`${URL_BASE}/personajes`, options)
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                document.body.innerHTML = `<div class="container">${data.mensaje}
                <br> <a href="http://localhost:3000/login.html">Iniciar sesión</a> </div>`
                return
            }
            PANEL.innerHTML = ""
            if (!data.personajes.length) {
                PANEL.innerHTML = `<div class="notification is-info">No hay personajes guardados</div>`
                return
            }
            data.personajes.forEach(personaje => {
                PANEL.innerHTML += renderGetCartasPersonajes(personaje)
            });
        })
}

const toggleNotificacion = (panel, texto) => {
    panel.textContent = texto
    panel.classList.toggle("is-hidden")
    setTimeout(() => {
        panel.classList.toggle("is-hidden")
    }, 3000)
}

FORM_NUEVO_PERSONAJE.addEventListener("submit", (e) => {
    e.preventDefault()
    let ruta = `${URL_BASE}/personaje`
    const formData = new FormData(FORM_NUEVO_PERSONAJE)
    let options = {
        method: "POST",
        body: formData
    }
    id = formData.get("id")
    if (id) {
        options.method = "PUT"
        ruta = `${URL_BASE}/personajes/${id}`
    }

    fetch(ruta, options)
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                toggleModalForm()
                toggleNotificacion(PANEL_MENSAJE_ERROR, data.mensaje)
                return
            }
            toggleModalForm()
            toggleNotificacion(PANEL_MENSAJE_EXITO, data.mensaje)
            rellenarCartas()
        })
})

const cerrarSesion = () => {
    localStorage.removeItem("token")
    location.reload()
}

rellenarCartas()