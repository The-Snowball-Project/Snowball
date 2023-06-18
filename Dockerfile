FROM node:18-alpine as base

WORKDIR /app

COPY . .

#RUN npm i

FROM base as production

ENV NODE_PATH ./build

RUN npm run dev
