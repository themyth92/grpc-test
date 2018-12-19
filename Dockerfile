FROM mhart/alpine-node:10

RUN apk add git && \
  npm install -g yarn && \
  git clone https://github.com/themyth92/grpc-test
RUN GRPC_HEALTH_PROBE_VERSION=v0.2.0 && \
  wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
  chmod +x /bin/grpc_health_probe
WORKDIR grpc-test
RUN yarn
HEALTHCHECK --interval=15s --timeout=3s CMD grpc_health_probe -addr=0.0.0.0:3000
EXPOSE 3000/tcp

CMD [ "node", "server.js" ]
