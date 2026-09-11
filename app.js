const express = require('express');
const app = express();
require('dotenv').config() //Forma de exportar antigua CommonJS
const port = process.env.PUERTO || 3000;

//middleware para parsear datos del body
app.use(express.json()) //--> en formato de JSON
app.use(express.urlencoded({extended: true})) //--> en formato de Formulario

//Leer archivo
const sistemaArchivo = require("fs");
const ruta = require("path");

const rutaArchivo = ruta.join(__dirname, "datos.json");

//Libreria para subir archivos
const multer = require("multer");

//Configurar almacenamiento archivos

const almacenamiento = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "misImagenes/");
    },
    filename:(req, file, cb)=>{
        const extension = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    }
});

const cargar = multer({storage: almacenamiento})

app.get("/", (req, res) => {
    res.send(`API REST APRENDICES`);
});

//Endpoint para listar aprendices
app.get("/api/aprendices", (req, res) => {
    //Leer archivo JSON
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos)=>{
        if(error){
            return res.status(500).json({Error: "No se puede leer rutaArchivo, o BD"})
        }
        const listaAprendices = JSON.parse(datos);
        res.status(200).json({"mensaje": listaAprendices});
    });

});

//Endpoint para listar un aprendiz
app.get("/api/aprendices/:id", (req, res) => {
    //res.status(200).json es para verificar que el mensjae esta OK
    res.status(200).json({
        "mensaje": "Aprendiz 1"
    });
});

//endpoint para crear aprendices

app.post('/api/aprendices',cargar.single("imagen"),(req, res) =>{
    
    const datosAprendiz = req.body 

    //AGREGAR LA RUTA DE LA IMAGEN
    datosAprendiz.imagen = req.file? `/misImagenes/${req.file.filename}` : "sin imagen"
    
    //leer archivo json
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos)=>{
        if (error){
            return res.status(500).json({Error: "No se puede leer rutaArchivo, o BD"});
        }
        const listaAprendices = JSON.parse(datos);
        
        //adicionar el nuevo aprendiz a la lista
        listaAprendices.push(datosAprendiz)
        sistemaArchivo.writeFile(rutaArchivo,JSON.stringify(listaAprendices, null, 2), (error)=>{
            if (error){
            return res.status(500).json({Error: "No se puede escribir en el archivo, o BD"});
            }
            res.status(200).json ({"mensaje":"Aprendiz creado", "Datos Aprendiz": datosAprendiz});
        });
        
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


app.post("/rutaJson", (req, res)=>{
    const todosDatos =req.body
    const edad =req.body.Edad
    if (edad >= 18) {
        res.json({"mensaje":"Es mayor de edad"})
    }else {
        res.json({"mensaje":"Es menor"})
    }
    res.json({datosJson: todosDatos});
});

app.post("/rutaFormularios", (req, res)=>{
    const todosDatos =req.body
    const programa = req.body.programa
    
    res.json({Todosdatos: todosDatos, Mi_Programa: programa})
});




app.listen(port, () => {
    console.log( `Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});