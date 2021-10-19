FROM node:12-alpine
WORKDIR /usr/src/app
COPY . .
RUN apk --no-cache add openjdk11-jre \
    && npm install \
    && sed -i 's/location.hostname === "localhost"/true/' /usr/src/app/public/js/index.js
EXPOSE  4400 4500 5000 5001 8001 8080 8085 9000
CMD [ "npm", "start" ]

# FROM openjdk:11
# WORKDIR /usr/src/app
# COPY . .
# RUN apt-get install -y curl \
#   && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
#   && apt-get install -y nodejs \
#   && curl -L https://www.npmjs.com/install.sh | sh \
#   && npm install \
#   && sed -i 's/location.hostname === "localhost"/true/' /usr/src/app/public/js/index.js
# EXPOSE  4400 4500 5000 5001 8001 8080 8085 9000
# CMD [ "npm", "start" ]