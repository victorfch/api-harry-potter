const PANEL_MENSAJE = document.querySelector(".notification")
const URL_BASE = "/api"
const form = document.querySelector("#formLogin")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("paron")
    let formData = new FormData(form)
    const options = {
        method: "POST",
        body: formData
    }
    fetch(`${URL_BASE}/login`, options)
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                console.log("entra")
                PANEL_MENSAJE.textContent = data.mensaje
                PANEL_MENSAJE.classList.toggle("is-hidden")
                setTimeout(() => {
                    PANEL_MENSAJE.classList.toggle("is-hidden")
                }, 3000)
                return
            }
            localStorage.setItem("token", data.token)
            location.href = "http://localhost:3000"
        })
})