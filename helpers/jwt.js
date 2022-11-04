const jwt = require('jsonwebtoken');





generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1d'
        }, (err, token) => {

            if( err ){
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve( token );
        });
    });

}


module.exports = {

    generarJWT
}