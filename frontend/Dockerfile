# frontend/Dockerfile
FROM node:20.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . /app/

RUN npm run build