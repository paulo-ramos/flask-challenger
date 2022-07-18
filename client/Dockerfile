FROM node:16-alpine 

RUN mkdir /app
WORKDIR /app

COPY package.json ./

RUN npm install --loglevel error

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
