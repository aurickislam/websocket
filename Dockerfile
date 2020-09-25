FROM node:12-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 80

CMD [ "node", "app.js" ]
#CMD [ "npm", "run", "dev-start" ]
