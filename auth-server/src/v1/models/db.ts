import mongoose from 'mongoose';
const mongoPort = process.env.MONGO_PORT;
const mongoAddr = process.env.MONGO_ADDR;
const mongoDbName = 'auth';

const dbURI = `mongodb://${mongoAddr}:${mongoPort}/${mongoDbName}`;
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', () => {
  console.log('Mongoose connection error:');
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connect(`mongodb://${mongoAddr}:${mongoPort}/${mongoDbName}`, {
  useNewUrlParser: true
});

function mongooseShutdown(msg: string, callback: () => void) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
}

// For nodemon restarts
process.once('SIGUSR2', () => {
  mongooseShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', () => {
  mongooseShutdown('app termination', () => {
    process.exit(0);
  });
});
