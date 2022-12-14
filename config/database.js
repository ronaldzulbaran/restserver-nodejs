require('dotenv');

const mongoose = require('mongoose');


const dbConnection = async () => {

    try{

        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos inicializada!')
    }catch(error){

        console.log(error);

        throw new Error('Error inicializando la base de datos');
    }

}


module.exports = {

    dbConnection
}