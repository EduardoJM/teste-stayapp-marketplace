FROM node:14

ADD package.json /app/package.json
WORKDIR /app
RUN npm install
COPY . /app

EXPOSE 4200

CMD ["npm", "start"]
