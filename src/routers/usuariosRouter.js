//Ruta de solo prueba
const { Router } = require('express')
const enrutador = Router()

//Funcion (req, res) debe ir en el controlador
enrutador.get("/rutaUsuarios", (req, res)=>{
    res.json({
        Mensaje: "Es mi ruta de Usuarios"
    })
})

module.exports = enrutador