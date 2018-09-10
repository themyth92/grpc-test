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
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    if (index % 2 === 0) {
      return dataClient.search2({ id: 1 }, (err, res) => {
        if (err) {
          return console.log(err);
        }
    
        return console.log('Search2 result', index, 'result:', res);
      });
    }
    return dataClient.search({ id: 1 }, (err, res) => {
      if (err) {
        return console.log(err);
      }
  
      return console.log('Search result', index, 'result:', res);
    });
  });
  
}

main();
