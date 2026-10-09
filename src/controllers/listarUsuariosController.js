const listarUsuarios = require("../services/usuariosServices")

const mostrarUsuarios = async (req, res)=>{
    try {
        const usuarios = await listarUsuarios()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({mensaje : "Error al comunicarse con la base de datos.", Error: error.message})
    }
}
//Ruta registrarse
const registrarController = async (req, res)=>{
    res.json({mensaje: "Ruta para registrarme"})
}

//Ruta de login
const loginController = async (req, res)=>{
    res.json({mensaje: "Ruta para iniciar sesion"})
}

module.exports = {
    mostrarUsuarios,
    registrarController,
    loginController
}


