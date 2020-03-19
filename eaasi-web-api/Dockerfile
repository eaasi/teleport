FROM node:10.16-alpine
WORKDIR /app
COPY .babelrc ./
COPY . ./
RUN npm config set unsafe-perm true
RUN npm install -g babel-cli
RUN npm install -g apidoc
RUN npm install npx sequelize sequelize-cli sequelize-auto-migrations pg
RUN apk update
RUN apk upgrade
RUN apk add bash
RUN ["chmod", "+x", "./wait-for-it.sh"]
RUN npm install
EXPOSE 8081
