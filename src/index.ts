import * as grpc from  'grpc';
import { DelegationService } from '../proto/delegation-service/generated/delegation_grpc_pb';
import { userServiceUrl, host, port } from './config';
import Server from './server';

function startServer() {
    const server = new grpc.Server();

    server.addService(DelegationService, new Server(userServiceUrl));
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server is listening on port ${port}`);
}

// Ensures you don't run the server twice
if (!module.parent) {
    startServer();
}
