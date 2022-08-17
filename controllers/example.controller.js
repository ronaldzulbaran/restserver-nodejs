const { response } = require('express');
const { request } = require('express');


const getExample = (req = request, res = response) => {

    const { page = 1, limit=10 } = req.query;
    res.json({
        msg:'GET API -- Controlador',
        page,
        limit,
    })
}

const storeExample = (req = request, res = response) => {

    const { nombre } = req.body;
    res.json({
        msg:'POST API -- Controlador',
        nombre
    })
}

const updateExample = (req = request, res = response) => {

    const { id } = req.params;
    res.json({
        msg:'POST API -- Controlador',
        id
    })
}

const deleteExample = (req, res = response) => {
    res.json({
        msg:'POST API -- Controlador'
    })
}

module.exports = {
    getExample,
    storeExample,
    updateExample,
    deleteExample
}