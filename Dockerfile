FROM openjdk:11
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh \
  && npm install
COPY . .
EXPOSE 5000/udp
EXPOSE 5000/tcp
CMD [ "npm", "start" ]