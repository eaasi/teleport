FROM node:10-alpine

COPY ./docker/entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

WORKDIR /data/

EXPOSE 8081

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD ["npm", "start"]
