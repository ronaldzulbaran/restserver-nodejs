const express = require('express');
var cors = require('cors')

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.examplePath = '/api/example';

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
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

        this.app.use(this.examplePath, require('../routes/example.route'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }

}

module.exports = Server;