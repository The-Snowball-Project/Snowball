FROM node:lts-alpine

ENV ENV=dev

WORKDIR /app

COPY ./src ./src

COPY package.json .
COPY tsconfig.json .

RUN npm install

CMD ["npm", "run","dev"]
