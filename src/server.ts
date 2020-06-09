import * as grpc from 'grpc';
import axios, { AxiosResponse } from 'axios';
import { IDelegationServer } from '../proto/delegation-service/generated/delegation_grpc_pb';
import { User, GetUserByIDRequest, FindUserByNameRequest, GetUserResponse, FindUserByNameResponse } from '../proto/delegation-service/generated/delegation_pb';
import { GrpcHealthCheck, HealthCheckResponse } from 'grpc-ts-health-check';

// For the health-check
export const serviceNames: string[] = ['', 'delegation.Delegation'];
export const healthCheckStatusMap = {
    '': HealthCheckResponse.ServingStatus.UNKNOWN,
    serviceName: HealthCheckResponse.ServingStatus.UNKNOWN,
};
export const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

interface IUser {
    id: string;
    armyId: string;
    displayName: string; // displayName
    firstName: string;
    lastName: string;
    rank: string;
    mail: string;
}

export class Server implements IDelegationServer {

    private userServiceUrl: string;
    private baseUrl: string;

    constructor(userServiceUrl: string) {
        this.userServiceUrl = userServiceUrl;
        this.baseUrl = `${userServiceUrl}/persons`;
    }

    async getUserByID(call: grpc.ServerUnaryCall<GetUserByIDRequest>, callback: grpc.sendUnaryData<GetUserResponse>) {
        const id = call.request.getId();
        let res: AxiosResponse;
        try {
            res = await axios.get(`${this.baseUrl}/${id}`);
        } catch (err) {
            let e: grpc.ServiceError;
            if (err.response && err.response.status) {
                const statusCode: number = err.response.status;
                if (statusCode === 404) {
                    e = {
                        code: grpc.status.NOT_FOUND,
                        message: `The user with id ${id} is not found`,
                        name: 'NotFound',
                    };
                    console.log(`The user with id ${id} is not found`);
                    return callback(e, null);
                }
            }
            e = {
                code: grpc.status.INTERNAL,
                message: `Unknown error: ${err}`,
                name: 'Unknown',
            };
            console.log(`Unknown Error while contacting PhoneBook ${err}`);
            return callback(e, null);
        }
        const userData: IUser = res.data;
        const user = setUser(userData);
        const response = new GetUserResponse();
        response.setUser(user);
        callback(null, response);
    }

    async findUserByName(call: grpc.ServerUnaryCall<FindUserByNameRequest>, callback: grpc.sendUnaryData<FindUserByNameResponse>) {
        const name = call.request.getName();
        let res: AxiosResponse;
        try {
            res = await axios.get(`${this.baseUrl}/search`, { params: { fullname: name } });
        } catch (err) {
            console.log(`Unknown Error while contacting PhoneBook ${err}`);

            const e: grpc.ServiceError = {
                code: grpc.status.INTERNAL,
                message: err,
                name: 'error',
            };

            return callback(e, null);
        }
        const usersData: IUser[] = res.data;
        const users: User[] = [];
        usersData.forEach((userData) => {
            users.push(setUser(userData));
        });

        const response = new FindUserByNameResponse();
        response.setUsersList(users);
        callback(null, response);
    }

}

function setUser(userData: IUser): User {
    const user = new User();
    user.setId(userData.id);
    user.setMail(userData.mail);
    user.setFirstName(userData.firstName);
    user.setLastName(userData.lastName);
    user.setFullName(`${userData.firstName} ${userData.lastName}`);
    user.setHierarchy(userData.displayName);
    return user;
}

function flattenHierarchy(hierarchy: string[]): string {
    return hierarchy.reduce((x, y) => `${x}/${y}`);
}
