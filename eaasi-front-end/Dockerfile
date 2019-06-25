FROM node:10-alpine

RUN mkdir /app

WORKDIR /data/

COPY . ./

EXPOSE 8080

CMD ["npm", "install"]

CMD ["npm", "run", "serve"]
