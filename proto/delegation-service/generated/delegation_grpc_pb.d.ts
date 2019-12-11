// package: delegation
// file: delegation.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as delegation_pb from "./delegation_pb";

interface IDelegationService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUserByID: IDelegationService_IGetUserByID;
    findUserByName: IDelegationService_IFindUserByName;
}

interface IDelegationService_IGetUserByID extends grpc.MethodDefinition<delegation_pb.GetUserByIDRequest, delegation_pb.GetUserResponse> {
    path: string; // "/delegation.Delegation/GetUserByID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<delegation_pb.GetUserByIDRequest>;
    requestDeserialize: grpc.deserialize<delegation_pb.GetUserByIDRequest>;
    responseSerialize: grpc.serialize<delegation_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<delegation_pb.GetUserResponse>;
}
interface IDelegationService_IFindUserByName extends grpc.MethodDefinition<delegation_pb.FindUserByNameRequest, delegation_pb.FindUserByNameResponse> {
    path: string; // "/delegation.Delegation/FindUserByName"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<delegation_pb.FindUserByNameRequest>;
    requestDeserialize: grpc.deserialize<delegation_pb.FindUserByNameRequest>;
    responseSerialize: grpc.serialize<delegation_pb.FindUserByNameResponse>;
    responseDeserialize: grpc.deserialize<delegation_pb.FindUserByNameResponse>;
}

export const DelegationService: IDelegationService;

export interface IDelegationServer {
    getUserByID: grpc.handleUnaryCall<delegation_pb.GetUserByIDRequest, delegation_pb.GetUserResponse>;
    findUserByName: grpc.handleUnaryCall<delegation_pb.FindUserByNameRequest, delegation_pb.FindUserByNameResponse>;
}

export interface IDelegationClient {
    getUserByID(request: delegation_pb.GetUserByIDRequest, callback: (error: grpc.ServiceError | null, response: delegation_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: delegation_pb.GetUserByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: delegation_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: delegation_pb.GetUserByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: delegation_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: delegation_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: delegation_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: delegation_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: delegation_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: delegation_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: delegation_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
}

export class DelegationClient extends grpc.Client implements IDelegationClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUserByID(request: delegation_pb.GetUserByIDRequest, callback: (error: grpc.ServiceError | null, response: delegation_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: delegation_pb.GetUserByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: delegation_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: delegation_pb.GetUserByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: delegation_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: delegation_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: delegation_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: delegation_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: delegation_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: delegation_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: delegation_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
}
