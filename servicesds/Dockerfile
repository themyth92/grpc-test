FROM mhart/alpine-node:10
RUN npm install -g yarn
COPY package.json service.js ./
RUN yarn

CMD [ "node", "service.js" ]
  