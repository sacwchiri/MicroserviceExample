FROM node:latest

RUN  mkdir /var/www /var/www/api/

VOLUME [ "/var/www/api/" ]

WORKDIR /var/www/api/

RUN npm install
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
CMD npx nodemon --exec npm start
