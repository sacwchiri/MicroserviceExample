FROM mongo:latest

VOLUME [ "/data/db" ]
EXPOSE 27017

CMD [ "mongod --auth --dbpath /data/db" ]

RUN "mongo -u root -p default --authenticationDatabase=admin"
