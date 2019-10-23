FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run styleguide:build
RUN npm run build

FROM nginx:latest as production-stage
RUN mkdir /app
RUN mkdir /styleguide
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/styleguide /app/styleguide
COPY nginx.conf /etc/nginx/nginx.conf
# CMD ["nginx", "-g", "daemon off;"]
