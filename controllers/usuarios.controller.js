const { response } = require('express');
const { request } = require('express');

const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');



const getUsuarios = async (req = request, res = response) => {

    const { page = 1, limit=5, desde =0 } = req.query;

    // const usuarios = await Usuario.find({ estado: true})
                // .skip(Number(desde))
                // .limit(Number(limit));

    // const total = await Usuario.countDocuments({ estado: true });

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true})
                .skip(Number(desde))
                .limit(Number(limit))
    ]);

    res.json({
        total,
        usuarios,
    })
}

const storeUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, role } = req.body;

    const usuario = new Usuario({ nombre, correo, password, role });

    const salt = bcrypt.genSaltSync(10)

    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    })
}

const updateUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, correo, password, google, ...resto } = req.body;

    if(password){

        const salt = bcrypt.genSaltSync(10)
        resto.password = bcrypt.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
}

const deleteUsuario = async (req, res = response) => {

    const { id } = req.params;

    // Borra fisicamente de la BD
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, { estado:false });

    res.json(usuario)
}

module.exports = {
    getUsuarios,
    storeUsuario,
    updateUsuario,
    deleteUsuario
}