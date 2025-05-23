ARG workdir="/app"

FROM node:lts-alpine AS build
RUN apk add git
ARG workdir
WORKDIR ${workdir}/eaasi-front-end
COPY ./eaasi-front-end/package*.json ./
RUN npm ci
COPY ./eaas-client ${workdir}/eaas-client/
COPY ./eaasi-web-api ${workdir}/eaasi-web-api/
COPY ./eaasi-front-end ./
RUN ln -f -s remote.ts ./src/config/index.ts
ENV NODE_ENV=production
RUN --mount=type=bind,source=.git,target=${workdir}/.git npm run build

FROM nginx:stable-alpine
ARG workdir
WORKDIR ${workdir}
COPY --chown=nginx:nginx ./eaasi-front-end/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=build ${workdir}/eaasi-front-end/dist ./
