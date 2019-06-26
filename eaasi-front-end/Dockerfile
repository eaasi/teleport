FROM node:10-alpine

RUN mkdir /app

WORKDIR /app/

COPY . ./

CMD ["npm", "install"]

EXPOSE 8080


CMD ["npm", "run", "serve"]
