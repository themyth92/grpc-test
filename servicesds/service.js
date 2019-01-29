'use strict';
const express = require('express');
const app = express();
const port = 2800;
const serviceName = 'myapp-service';
const superagent = require('superagent');
const fs = require('fs');
const token = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token').toString();
const cert = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/ca.crt').toString();


app.post(`/v2/discovery:endpoints`, (req, res) => {
  const url = `https://kubernetes/api/v1/namespaces/default/endpoints/${serviceName}`;

  superagent
    .get(url)
    .ca(cert)
    .set('Authorization', `Bearer ${token}`)
    .then(r => {
      const endpoint = r.body.subsets[0].addresses;
      const hosts = [];

      endpoint.forEach(e => {
        hosts.push({
          endpoint: {
            address: {
              socket_address: {
                address: e.ip,
                port_value: 3000
              }
            }
          }
        })
      });

      console.log(hosts)

      res.json({
        version_info: 'v1',
        resources: [{
          "@type": "type.googleapis.com/envoy.api.v2.ClusterLoadAssignment",
          cluster_name: 'myapp-service',
          endpoints: [{
            lb_endpoints: hosts
          }]
        }]
      });
    })
    .catch(err => {
      console.log(err);
      res.json(500);
    })
});

app.listen('2800', () => console.log(`Example app listening on port ${port}!`));

