// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var delegation_pb = require('./delegation_pb.js');

function serialize_delegation_FindUserByNameRequest(arg) {
  if (!(arg instanceof delegation_pb.FindUserByNameRequest)) {
    throw new Error('Expected argument of type delegation.FindUserByNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_delegation_FindUserByNameRequest(buffer_arg) {
  return delegation_pb.FindUserByNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_delegation_FindUserByNameResponse(arg) {
  if (!(arg instanceof delegation_pb.FindUserByNameResponse)) {
    throw new Error('Expected argument of type delegation.FindUserByNameResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_delegation_FindUserByNameResponse(buffer_arg) {
  return delegation_pb.FindUserByNameResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_delegation_GetUserByIDRequest(arg) {
  if (!(arg instanceof delegation_pb.GetUserByIDRequest)) {
    throw new Error('Expected argument of type delegation.GetUserByIDRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_delegation_GetUserByIDRequest(buffer_arg) {
  return delegation_pb.GetUserByIDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_delegation_GetUserResponse(arg) {
  if (!(arg instanceof delegation_pb.GetUserResponse)) {
    throw new Error('Expected argument of type delegation.GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_delegation_GetUserResponse(buffer_arg) {
  return delegation_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DelegationService = exports.DelegationService = {
  getUserByID: {
    path: '/delegation.Delegation/GetUserByID',
    requestStream: false,
    responseStream: false,
    requestType: delegation_pb.GetUserByIDRequest,
    responseType: delegation_pb.GetUserResponse,
    requestSerialize: serialize_delegation_GetUserByIDRequest,
    requestDeserialize: deserialize_delegation_GetUserByIDRequest,
    responseSerialize: serialize_delegation_GetUserResponse,
    responseDeserialize: deserialize_delegation_GetUserResponse,
  },
  findUserByName: {
    path: '/delegation.Delegation/FindUserByName',
    requestStream: false,
    responseStream: false,
    requestType: delegation_pb.FindUserByNameRequest,
    responseType: delegation_pb.FindUserByNameResponse,
    requestSerialize: serialize_delegation_FindUserByNameRequest,
    requestDeserialize: deserialize_delegation_FindUserByNameRequest,
    responseSerialize: serialize_delegation_FindUserByNameResponse,
    responseDeserialize: deserialize_delegation_FindUserByNameResponse,
  },
};

exports.DelegationClient = grpc.makeGenericClientConstructor(DelegationService);
