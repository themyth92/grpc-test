'use strict';
const path = require('path');
const grpc = require('grpc');
const protoPath = path.join(__dirname, '/data.proto');
const Client = grpc.load(protoPath).data;
const getClient = function getClient(address) {
  return new Client(address, grpc.credentials.createInsecure());
};
const Health = grpc.load(path.join(__dirname, '/health.proto')).grpc.health.v1.Health;
const getHealth = function getHealth(address) {
  return new Health(address, grpc.credentials.createInsecure());
}

function main() {
  const dataClient = getClient('3.16.69.151:30000');
  const healthClient = getHealth('3.16.69.151:30000');

  return dataClient.search({ id: 1 }, (err, res) => {
    if (err) {
      return console.log(err);
    }

    console.log('Search result', 'result:', res);
    return dataClient.search({ id: 1 }, (err, res) => {
      if (err) {
        return console.log(err);
      }
  
      console.log('Search result', 'result:', res);
      return healthClient.Check({ service: 'My Service' }, (err, res) => {
        if (err) {
          return console.log(err);
        }

        console.log('Health check:', res);
      });
    });
  });
}

setInterval(() => {
  main();
}, 30000);
