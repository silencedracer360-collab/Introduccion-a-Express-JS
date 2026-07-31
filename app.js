import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PUERTO || 3000;

app.get("/", (_, res) => {
res.send(`Aprendicez ficha 3407186 jijij`);
});

app.get("/ruta1", (req, res)=>{
    //Template string
    res.send(`<h1>Usando res.send</h1>`);
});

app.get("/ruta2", (req, res)=>{
    //Formato json
    res.json({
        "dev" : "node --watch app.js",
        "start" : "node app.js"
    });
});

//Rutas Dinamicas
app.get("/ruta3/:nombre/:apellido", (req, res)=>{
    let nameUsuario = req.params.nombre
    let lastUsuario = req.params.apellido
    res.json({
        "usuario": nameUsuario,
        "apellido": lastUsuario
    });
});

//Ruta con parametros de consulta <=> query
app.get("/ruta4", (req, res)=>{
    const numero = req.query.phone || `sin numero`
    const order = req.query.orden || `sin orden`
    const pagina = req.query.page || 1
    res.send(`<h1>Listado aprendices</h1>
        <h2>El listado en orden ${order}</h2>
        <h3>Numero: ${numero}</h3>
        <p>Pagina: ${pagina}</p>
        `);
});





app.listen(port, () => {
console.log( `SERVIDOR: http://localhost:${port}`);
});

