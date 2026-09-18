const express = require('express');

const app = express()
//Importar Enrutador
const enrutador = require('./routers')
require('dotenv').config()

//Usar los middleware
app.use(express.json()) //--> en formato de JSON
app.use(express.urlencoded({extended: true})) //--> en formato de Formulario

//Importar el archivo enrutador(todas las rutas) de routers
app.use("/api", enrutador)

//Endpoint de bienvenida
app.get("/", (req, res)=>{
    res.send("API, REST Estructurado en capas")
});

module.exports = app