const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){

        return res.status(401).json({
            msg:'Acceso no autorizado.'
        });
    }

    try {

       const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

       //pasa uid al request y poder capturarlo en el controlador
       const usuario = await Usuario.findById(uid);

       if(!usuario){

        return res.status(401).json({
            msg:'Token invalido.'
        });
       }

       if(!usuario.estado){

        return res.status(401).json({
            msg:'Token invalido.'
        });
       }

       req.auth = usuario;

    } catch (error) {

        return res.status(401).json({
            msg:'Token invalido.'
        });
    }

    next();
}


module.exports = {
    validarJWT
}