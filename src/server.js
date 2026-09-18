//importar mi aplicacion
const app = require('./app');

//Verificar el puerto del entorno virtual
const PUERTO = process.env.PUERTO || 3333

//Imprimo por consola el link del servidor
app.listen(PUERTO, ()=>{
    console.log(`MI SERVIDOR: http://localhost:${PUERTO}`)
});

