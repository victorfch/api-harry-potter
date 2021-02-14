const ICON_CHECK = `<i class="fas fa-check"></i>`
const ICON_CROSS = `<i class="fas fa-times"></i>`


const renderModalVerPersonaje = (personaje, varita) => {
    return `<div class="modal-background"></div>
    <div class="modal-card">
        <div class="modal-card-head">
            <p class="modal-card-title has-text-centered">${personaje.nombre}</p>
        </div>
        <div class="modal-card-body">
            <div class="is-pulled-left">
            <p><b>Especie:</b> ${personaje.especie}</p>
            <p><b>Sexo:</b> ${personaje.sexo}</p>
            <p><b>Patronus:</b> ${personaje.patronus ? personaje.patronus : "desconocido"}</p>
            <p><b>Vivo: ${personaje.vivo ? ICON_CHECK : ICON_CROSS}</b></p>
            <p><b>Color de ojos:</b> ${personaje.colorOjos ? personaje.colorOjos : "desconocido"}</p>
            <p><b>Color de pelo:</b> ${personaje.colorPelo ? personaje.colorPelo : "desconocido"}</p>
            <p><b>Varita</b></p>
            <ul class="ml-3">
                <li><b>Madera:</b> ${varita[0] ? varita[0] : "desconocido"}</li>
                <li><b>Núcleo:</b> ${varita[1] ? varita[1] : "desconocido"}</li>
                <li><b>Tamaño:</b> ${varita[2] ? varita[2] : "desconocido"}</li>
            </ul>
            <p><b>Estudiante de Howgarts:</b> ${personaje.estudianteHogwarts ? ICON_CHECK : ICON_CROSS}</p>
            <p><b>${personaje.sexo == "hombre" ? "Actor" : "Actriz"}:</b> ${personaje.actor}</p>
            </div>
            <div class="is-pulled-right mr-6">
            <p><b>Casa:</b> ${getCasa(personaje.casa)}</p>
            </div>
        </div>
        <button onclick="toggleModalVer()" class="modal-close is-large" aria-label="close"></button>
    </div>`
}

const renderGetCartasPersonajes = (personaje) => {
    return `<div class="column is-4">
    <div class="card">
        <div class="card-header">
            <p class="card-header-title">
                ${personaje.nombre}
            </p>
            <div class="card-header-icon" aria-label="see">
                <span class="icon">
                    <button onclick="verPersonaje(${personaje.id})" class="button">
                        <i class="fas fa-eye"></i>
                    </button>
                </span>
            </div>
        </div>
        <div class="card-content">
            <div class="content">
                <p>Especie: ${personaje.especie}</p>
                <p>Género: ${personaje.sexo}</p>
                <p>Patronus: ${personaje.patronus ? personaje.patronus : "desconocido"}</p>
                <p>Vivo: ${personaje.vivo ? ICON_CHECK : ICON_CROSS}</p>
            </div>
        </div>
        <div class="card-footer">
            <button onclick="modificarPersonaje(${personaje.id})" class="button is-success card-footer-item">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="eliminarPersonaje(${personaje.id})" class="button is-danger card-footer-item">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </div>
    </div > `
}

const getCasa = (idCasa) => {
    let casa = "gryffindor"
    idCasa = parseInt(idCasa)

    switch (idCasa) {
        case 2:
            casa = "slytherin"
            break;
        case 3:
            casa = "ravenclaw"
            break;
        case 4:
            casa = "hufflepuff"
            break;
    }

    return `<figure class="image is-128x128">
    <img class="is-rounded" src="../assets/img/${casa}.jpg">
    </figure>`
}