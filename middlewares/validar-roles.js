const { request, response } = require("express");


const esAdmin = (req = request, res = response, next) => {

    if(!req.auth){

        return res.status(500).json({
            msg:'Role Undefine'
        });
    }

    const { role } = req.auth;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:'Necesita privilegios elevado para realizar la accion'
        });
    }

    next();

}

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {

        if(!req.auth){

            return res.status(500).json({
                msg:'Role Undefine'
            });
        }

        const { role } = req.auth;

        if(!roles.includes(role)){

            return res.status(401).json({
                msg:'No tiene privilegios para realizar la accion'
            });
        }

        next();
    }

}


module.exports = {
    esAdmin,
    tieneRole
}