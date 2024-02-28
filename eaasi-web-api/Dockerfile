ARG workdir="/app"

FROM node:lts-alpine AS base
ARG workdir
WORKDIR ${workdir}
RUN mkdir dist && chown --recursive node:node .
COPY --chown=node:node ./package*.json ./
USER node
RUN npm ci --only=production

FROM base AS build
RUN npm ci
COPY --chown=node:node . ./
RUN sed -i "s/src/dist/g" .sequelizerc
ENV NODE_ENV production
RUN npm run build

FROM node:lts-alpine
ARG workdir
WORKDIR ${workdir}
RUN chown node:node .
USER node
ENV NODE_ENV production
COPY --from=base ${workdir}/ ./
COPY --from=build ${workdir}/.sequelizerc ./
COPY --from=build ${workdir}/scripts ./
COPY --from=build ${workdir}/dist ./dist/
CMD ["./start.sh", "./dist/app.js"]
