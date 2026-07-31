import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PUERTO || 3000;

app.get("/", (_, res) => {
res.send(`Aprendicez ficha 3407186 jijij`);
});


// 1. Parámetro simple único
app.get("/saludo/:nombre", (req, res) => {
    const { nombre } = req.params;

    if (nombre.length < 3) {
        return res.status(400).json({
            error: "El nombre debe tener al menos 3 letras."
        });
    }

    res.send(`Hola, ${nombre}, bienvenido`);
});

// 2. Parámetro simple único
app.get("/productos/:nombre", (req, res) => {
    const { nombre } = req.params;

    const producto = {
        id: 1,
        nombre: nombre,
        stock: 50,
        precioUnitario: 25.99,
        categoria: "Tecnología"
    };

    res.json(producto);
});

// 3. Múltiples parámetros en la ruta
app.get("/productos/:categoria/:id", (req, res) => {
    const { categoria, id } = req.params;

    res.json({
        servidor: "Servidor Express",
        categoria: categoria,
        producto: id
    });
});




app.listen(port, () => {
console.log( `SERVIDOR: http://localhost:${port}`);
});

