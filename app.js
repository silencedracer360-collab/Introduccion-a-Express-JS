const express = require('express');
const app = express();
require('dotenv').config() //Forma de exportar antigua CommonJS
const port = process.env.PUERTO || 3000;

//middleware para parsear datos del body
app.use(express.json()) //--> en formato de JSON
app.use(express.urlencoded({extended: true})) //--> en formato de Formulario

app.get("/", (req, res) => {
    res.send(`API REST APRENDICES`);
});

//Lista aprendices
app.get("/api/aprendices", (req, res) => {
    //res.status(200).json es para verificar que el mensjae esta OK
    res.status(200).json({
        "mensaje": "Lista de Aprendices"
    });
});

//Listar un aprendiz
app.get("/api/aprendices/:id", (req, res) => {
    //res.status(200).json es para verificar que el mensjae esta OK
    res.status(200).json({
        "mensaje": "Aprendiz 1"
    });
});

//Endpoint crear aprendices
app.post("/api/aprendices", (req, res) => {
    res.status(201).json({
        "mensaje": "Crear aprendiz"
    });
});

//Endpoint para editar aprendices
app.put("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje": "Editar aprendiz"
    });
});
//Endpoints para eliminar aprendices
app.delete("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje": "Eliminar aprendiz"
    });
});


app.post("/rutaJSON", (req, res) => {
    const todosDatos = req.body
    const edad = req.body.edad2
    if(edad >= 18){
        res.json({datosJson: "Es mayor de edad"});
    }else{
        res.json({mensaje: ""});
    }

});

app.post("/rutaFormulario", (req, res) => {
    const todosDatos = req.body
    const programa = req.body.programa
    res.json({TodosDatos: todosDatos, miPrograma: programa});
});



app.listen(port, () => {
    console.log( `Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});