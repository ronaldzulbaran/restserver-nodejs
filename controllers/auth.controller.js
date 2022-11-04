const { request, response } = require("express");
const bcryptjs = require('bcrypt');

const  Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");


const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try{

        const usuario = await Usuario.findOne({correo});

        if(!usuario){

            return res.status(400).json({
                msg: 'Usuario / Password invalido - Correo'
            });
        }

        if(!usuario.estado){

            return res.status(400).json({
                msg: 'Usuario / Password invalido - Estado'
            });
        }

        const passwdValido = bcryptjs.compareSync(password, usuario.password);

        if(!passwdValido){

            return res.status(400).json({
                msg: 'Usuario / Password invalido - Password'
            });
        }

        const token = await generarJWT(usuario.id);

        return res.json({
            usuario,
            token
        });

    }catch(error){

        console.log(error)

        res.status(500).json({
            msg: 'Ups! algo salió mal...'
        });
    }
}


module.exports = {
    login
}