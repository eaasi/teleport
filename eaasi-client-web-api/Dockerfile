FROM node:10.16-alpine

WORKDIR /app

COPY .babelrc ./

COPY . ./

RUN npm install -g npx sequelize sequelize-cli sequelize-auto-migrations pg babel-cli

RUN apk update

RUN apk upgrade

RUN apk add bash

RUN ["chmod", "+x", "./wait-for-it.sh"]

RUN npm install --only=prod

EXPOSE 8081
