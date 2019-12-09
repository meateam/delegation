const grpc = require('grpc');

const server = new grpc.Server();
const host = '0.0.0.0';
const port = '8080';
server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Server is listening on port ${port}`);
