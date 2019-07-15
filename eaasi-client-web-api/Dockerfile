FROM node:10.16-alpine

WORKDIR /app

COPY .babelrc ./

COPY . ./

RUN npm install -g sequelize sequelize-cli sequelize-auto-migrations pg babel-cli

RUN apk update

RUN apk upgrade

RUN apk add bash

RUN ["chmod", "+x", "./wait-for-it.sh"]

RUN npm install

EXPOSE 8081
