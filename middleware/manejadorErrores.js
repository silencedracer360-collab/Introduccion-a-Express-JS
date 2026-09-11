require('dotenv').config()

const manejadorErrores = (error, req, res, next)=>{
    const fecha = new Date().toISOString();
    const codigoEstado = error.statusCode || 500
    const mensaje = error.message || "Error inesperado !!"
    console.error(`[ERROR] - ${fecha} - ${codigoEstado} - ${mensaje}`);
    //Validar si hay mas informacion
    if(error.stack){
        console.error(error.stack)
    }
    //Respuesta en json
    res.json({
        Error : "ERROR", 
        codigoEstado,
        mensaje,
        //dependiendo si estamos en desarrollo o produccion
        ...(process.env.NODE_ENV === "development" && {stack: error.stack})
    })

    next()
}

module.exports = manejadorErrores