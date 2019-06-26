FROM node:10-alpine

WORKDIR /app

COPY . ./

RUN npm install -g sequelize-cli

RUN npm install

CMD ["chmod", "x", "./wait-for-it.sh"]

CMD ["./wait-for-it.sh", "eaasi-database:5432", "--", "sequelize", "db:migrate"]

RUN sequelize db:migrate

EXPOSE 8081

CMD ["npm", "start"]
