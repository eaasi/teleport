FROM node:10-alpine

WORKDIR /app

COPY . ./

EXPOSE 8081

RUN npm install

RUN sequelize init

RUN sequelize db:migrate

CMD ["npm", "start"]