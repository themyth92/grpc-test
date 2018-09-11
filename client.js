'use strict';
const path = require('path');
const grpc = require('grpc');
const protoPath = path.join(__dirname, '/data.proto');
const Client = grpc.load(protoPath).data;
const getClient = function getClient(address) {
  return new Client(address, grpc.credentials.createInsecure());
};

function main() {
  const dataClient = getClient('0.0.0.0:3000');
  return dataClient.search({ id: 1 }, (err, res) => {
    if (err) {
      return console.log(err);
    }

    console.log('Search result', 'result:', res);
    return dataClient.search2({ id: 1 }, (err, res) => {
      if (err) {
        return console.log(err);
      }
  
      console.log('Search result', 'result:', res);
    });
  });
}

main();
