FROM node:20 as build
WORKDIR /app
COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node", "dist/server.js"]