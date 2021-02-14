const bcrypt = require("bcryptjs")
const jwt = require("jwt-simple")
const moment = require("moment")
const usuario = require("../usuario")
const TOKEN_SECRETO = "@SuperClaVeToKenSecReto"

const loginCorrecto = (user) => {
    if (user.user != usuario.nombre) return false
    let passwordCorrect = bcrypt.compareSync(user.password, usuario.password)
    if (!passwordCorrect) return false
    return true
}

const crearToken = () => {
    const payload = {
        sub: usuario.id,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix()
    }

    return jwt.encode(payload, TOKEN_SECRETO)
}

module.exports = {
    loginCorrecto,
    crearToken

}