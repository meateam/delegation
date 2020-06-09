import * as grpc from  'grpc';
import { DelegationService } from '../proto/delegation-service/generated/delegation_grpc_pb';
import { userServiceUrl, host, port, healthCheckInterval } from './config';
import { Server, grpcHealthCheck, serviceNames } from './server';
import { HealthService, HealthCheckResponse } from 'grpc-ts-health-check';
import axios, { AxiosResponse } from 'axios';

const StatusesEnum = HealthCheckResponse.ServingStatus;

function startServer() {
    const server = new grpc.Server();

    const delegationServer = new Server(userServiceUrl);
    server.addService(DelegationService, delegationServer);

    server.addService(HealthService, grpcHealthCheck);

    updateHealthStatus(delegationServer);

    setHealthStatus(delegationServer, HealthCheckResponse.ServingStatus.SERVING);
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server is listening on port ${port}`);
}

function setHealthStatus(server: Server, status: number): void {
    for (let i = 0; i < serviceNames.length; i++) {
        grpcHealthCheck.setStatus(serviceNames[i], status);
    }
}

async function updateHealthStatus(delegationServer: Server) {
    setInterval(
        async function () {
            const currStatus = (await checkPBHealth()) ? StatusesEnum.SERVING : StatusesEnum.NOT_SERVING;
            setHealthStatus(delegationServer, currStatus);
        },
        healthCheckInterval,
    );
}

async function checkPBHealth(): Promise<boolean> {
    let res : AxiosResponse;
    try {
        res = await axios.get(`${userServiceUrl}/isalive`);
        return res.status === 200 ? true : false;
    } catch (err) {
        console.log('error in healthcheck - phonebook isalive returned error:');
        console.log(err.message);
    }
    return false;
}

// Ensures you don't run the server twice
if (!module.parent) {
    startServer();
}
