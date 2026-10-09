//Ruta de solo prueba
const { Router } = require('express')
const enrutador = Router()
const { mostrarUsuarios, registrarController, loginController } = require('../controllers/listarUsuariosController')

//Funcion (req, res) debe ir en el controlador
enrutador.get("/listado", mostrarUsuarios)
//Ruta para registrarse
enrutador.get("/registrar", registrarController)
//Ruta para iniciar sesion
enrutador.get("/login", loginController)

module.exports = enrutador
