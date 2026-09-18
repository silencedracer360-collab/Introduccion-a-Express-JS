//Ruta de solo prueba
const { Router } = require('express')
const enrutador = Router()
const listarUsuarios = require('../controllers/listarUsuariosController')

//Funcion (req, res) debe ir en el controlador
enrutador.get("/rutaUsuarios", listarUsuarios)

module.exports = enrutador