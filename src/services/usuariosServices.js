const ormPrisma = require("../config/conexion")
const incriptacion = require("bcryptjs")

const listarUsuarios = async ()=>{
    const usuarios = await ormPrisma.usuarios.findMany();
    return usuarios
}

const registrarUsuario = async (email, name, clave)=>{
    const claveHashed = await incriptacion.hash(clave, 10)
    const create = await ormPrisma.usuarios.create({data: {email, name, clave: claveHashed}});
    return create
}

const listarUsuarioID = async (idUser)=>{
    const usuario = await ormPrisma.usuarios.findUnique({ where: {id: idUser} })
    return usuario
}   
const usuarioEditar = async (idUser, dataUser)=>{
    const usuarioUpdated = await ormPrisma.usuarios.update({ where: {id: idUser}, data: dataUser })
    return usuarioUpdated
}   
const usuarioEliminar = async (idUser)=>{
    const usuarioDeleted = await ormPrisma.usuarios.delete({ where: {id: idUser} })
    return usuarioDeleted
}   

module.exports = {listarUsuarios, registrarUsuario, listarUsuarioID, usuarioEditar, usuarioEliminar}