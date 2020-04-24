FROM postgres:11.3-alpine

COPY should_create_db.sh /tmp/  
RUN chmod u+x /tmp/should_create_db.sh && /tmp/should_create_db.sh
