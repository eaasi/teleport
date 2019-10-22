# build stage
FROM node:10-alpine as build-stage
# make the 'app' folder the current working directory
WORKDIR /app
# copy both 'package.json' and 'package-lock.json'
COPY package*.json ./
# install project dependencies
RUN npm install
# copy project files and directories to the working directory
COPY . .
# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/ngnix/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
