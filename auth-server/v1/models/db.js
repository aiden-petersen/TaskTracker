const mongoose = require('mongoose');

const mongo_port = process.env.MONGO_PORT;
const mongo_addr = process.env.MONGO_ADDR;
const mongo_db_name = "auth";

const dbURI = `mongodb://${mongo_addr}:${mongo_port}/${mongo_db_name}`;
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
     console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

mongoose.connect(`mongodb://${mongo_addr}:${mongo_port}/${mongo_db_name}`, {useNewUrlParser: true});

function mongooseShutdown(msg, callback) {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
    mongooseShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    mongooseShutdown('app termination', function() {
        process.exit(0);
    });
});

require('./userSchema');