
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolevalido = async (role) => {
    const existeRole = await Role.findOne({ role });

    if(!existeRole){
        throw new Error(`El role ${role} no esta registrado en la BD`)
    }
}


const emailExiste = async (correo) => {

    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){

        throw new Error(`El correo ${correo}, ya se encuentra registrado en la BD`)
    }
}

const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){

        throw new Error(`El ID ${id}, no existe en la BD`)
    }
}

module.exports = {
    esRolevalido,
    emailExiste,
    existeUsuarioPorId
}