'use strict';
const path = require('path');
const grpc = require('grpc');
const protoPath = path.join(__dirname, '/data.proto');
const Client = grpc.load(protoPath).data;
const getClient = function getClient(address) {
  return new Client(address, grpc.credentials.createInsecure());
};

function main() {
  const dataClient = getClient('127.0.0.1:3000');
  dataClient.search({ id: 1 }, (err, res) => {
    if (err) {
      return console.log(err);
    }

    return console.log('Query result', res);
  });
}

main();
