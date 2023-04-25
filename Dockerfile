FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY .. ./

ENV MONGO_HOST='mongodb:27017'
ENV SQL_HOST='mysql'
ENV NODE_ENV='PRODUCTION'

RUN npm i
CMD ["npm", "run", "start"]
