import * as grpc from  'grpc';
import { DelegationService } from '../proto/delegation-service/generated/delegation_grpc_pb';
import { userServiceUrl, host, port, healthCheckInterval } from './config';
import { Server, grpcHealthCheck, healthCheckStatusMap } from './server';
import { HealthService, HealthCheckResponse, HealthClient, HealthCheckRequest } from 'grpc-ts-health-check';
import axios, { AxiosResponse } from 'axios';

const StatusesEnum = HealthCheckResponse.ServingStatus;
const servicesNum = Object.keys(healthCheckStatusMap).length;
let requests = new Array<HealthCheckRequest>(servicesNum);

function startServer() {
    // Create the server
    const server = new grpc.Server();
    const delegationServer = new Server(userServiceUrl);

    // Register the Delegation Service
    server.addService(DelegationService, delegationServer);

    // Register the health service
    server.addService(HealthService, grpcHealthCheck);

    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server is listening on port ${port}`);

    // Create the health client
    const healthClient = new HealthClient(`${host}:${port}`, grpc.credentials.createInsecure());
    addServices();
    
    setInterval(function () {
        requests.forEach(request => {  
            // Check health status, this will provide the current health status of the service when the request is executed.
            healthClient.check(request, (error: Error | null, response: HealthCheckResponse) => {
                if (error) {
                    console.log(`${request.getService()} Service: Health Check Failed`);
                    console.log(error);
                } 
            }); 
        });
    },1000);


    updateHealthStatus();
    setHealthStatus(HealthCheckResponse.ServingStatus.SERVING);
}

function addServices(): void {
    // Set services
    for (const service in healthCheckStatusMap) {
        const request = new HealthCheckRequest();
        request.setService(service);
        requests.push(request);
    }
}

function setHealthStatus(status: number): void {
    requests.forEach(request => {
        const serviceName: string = request.getService();
        healthCheckStatusMap[serviceName] = status;
    })
}

async function updateHealthStatus() {
    setInterval(
        async function () {
            const currStatus = (await checkPBHealth()) ? StatusesEnum.SERVING : StatusesEnum.NOT_SERVING;
            setHealthStatus(currStatus);
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
