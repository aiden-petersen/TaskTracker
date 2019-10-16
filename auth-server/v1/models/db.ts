import mongoose from 'mongoose';
const mongo_port = process.env.MONGO_PORT;
const mongo_addr = process.env.MONGO_ADDR;
const mongo_db_name = "auth";

const dbURI = `mongodb://${mongo_addr}:${mongo_port}/${mongo_db_name}`;
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', () => {
     console.log('Mongoose connection error:');
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.connect(`mongodb://${mongo_addr}:${mongo_port}/${mongo_db_name}`, {useNewUrlParser: true});

function mongooseShutdown(msg: String, callback: Function) {
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
