import mongoose from 'mongoose';
import config from './config';
import app from './app';

let server: any;

const startServer = async () => {
  await mongoose.connect(config.database_url as string);
  console.log('\x1b[36mDatabase connection successfull\x1b[0m');

  server = app.listen(config.server_port || 5000, () => {
    console.log(`\x1b[32mServer is listening on port ${config.server_port || 5000}\x1b[0m`);
  });
};


// handle uncaught exception error
// process.on('uncaughtException', (error) => {
//   console.log('uncaughtException error', error);
//   process.exit(1);
// });

// handle unhandled rejection
// process.on('unhandledRejection', (reason, promise) => {
//   console.log(`unhandle rejection at ${promise} and reason ${reason}`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// });

// gracefull shoutdown on SIGTERM
// process.on('SIGTERM', () => {
//   console.log('SIGTERM signal received.');
//   server.close(() => {
//     console.log('Server closed.');
//   });
// });

startServer();
