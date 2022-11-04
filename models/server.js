const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../config/database');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.authPath     = '/api/auth';
        this.examplePath  = '/api/example';
        this.usuariosPath = '/api/usuarios';

        // Inicializar Base de Datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }


    async connectDB(){
        await dbConnection()
    }


    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y Parse del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth.route'));
        this.app.use(this.examplePath,  require('../routes/example.route'))
        this.app.use(this.usuariosPath, require('../routes/usuarios.route'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }

}

module.exports = Server;