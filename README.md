## Prequsite
- Node 10
- Yarn

## Install
- `npm -g install yarn`
- `yarn`

## Run on local
- `node client.js`
- Wait for 30s. The response receive should have 2 numbers with different value, it means it from different Pods

## Run on an instance inside VPC
- change client.js:
  ```
  const dataClient = getClient('eks-test-grpc.local:30000');
  const healthClient = getHealth('eks-test-grpc.local:30000');
  ```
- `node client.js`
- Wait for 30s. The response receive should have 2 numbers with different value, it means it from different Pods
