'use strict';
const internalIp = require('internal-ip');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const grpcLibrary = require('@grpc/grpc-js');
const dataPackageDefinition = protoLoader.loadSync(path.join(__dirname, '/data.proto'));
const healthPackageDefinition = protoLoader.loadSync(path.join(__dirname, '/health.proto'));
const data = grpcLibrary.loadPackageDefinition(dataPackageDefinition).data;
const health = grpcLibrary.loadPackageDefinition(healthPackageDefinition).grpc.health.v1.Health;

class Data {
  search(call, callback) {
    setTimeout(function() {
      return callback(null, { message: internalIp.v4.sync() });
    }, 5000);
  }

  search2(call, callback) {
    setTimeout(function() {
      return callback(null, { message: internalIp.v4.sync() });
    }, 5000);
  }
}

class Health {
  Check(call, callback) {
    return callback(null, { status: 'SERVING' });
  }
}

function getServer(listener) {
  const server = new grpc.Server();
  server.addService(data.service, new Data);
  server.addService(health.service, new Health);
  server.bind(listener, grpc.ServerCredentials.createInsecure());
  return server;
}

function main() {
  // NOTE: must use 0.0.0.0, dont use localhost
  const dataServer = getServer('0.0.0.0:3000');
  dataServer.start();
}

main();
