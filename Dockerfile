FROM node
COPY ./package.json /var/www
WORKDIR /var/www
RUN npm install
COPY . /var/www
EXPOSE 3001
ENTRYPOINT ["npm", "start"]