FROM node:latest as build-stage
COPY ./eaasi-front-end/package*.json /app/eaasi-front-end/
WORKDIR /app/eaasi-front-end
RUN npm install
COPY ./eaas-client /app/eaas-client/
COPY ./eaasi-web-api /app/eaasi-web-api/
COPY ./eaasi-front-end /app/eaasi-front-end/
RUN npm run styleguide:build
RUN npm run build

FROM nginx:latest as production-stage
COPY --from=build-stage /app/eaasi-front-end/dist /app/
COPY --from=build-stage /app/eaasi-front-end/styleguide /app/styleguide/
COPY ./eaasi-front-end/nginx.conf /etc/nginx/nginx.conf
