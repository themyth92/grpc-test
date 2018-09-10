'use strict';
const internalIp = require('internal-ip');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const protoPath = path.join(__dirname, '/data.proto');
const grpcLibrary = require('@grpc/grpc-js');
const packageDefinition = protoLoader.loadSync(protoPath);
const data = grpcLibrary.loadPackageDefinition(packageDefinition).data;

class Data {
  search(call, callback) {
    setTimeout(function() {
      return callback(null, { message: internalIp.v4.sync() });
    }, 5000);
  }
}

function getServer(service, serviceCall, listener) {
  const server = new grpc.Server();
  server.addService(service, serviceCall);
  server.bind(listener, grpc.ServerCredentials.createInsecure());
  return server;
}

function main() {
  // NOTE: must use 0.0.0.0, dont use localhost
  const dataServer = getServer(data.service, new Data, '0.0.0.0:3000');
  dataServer.start();
}

main();
