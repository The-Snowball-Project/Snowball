FROM node:18-alpine as base

WORKDIR /app

COPY package.json ./

COPY tsconfig.json ./

RUN npm i

COPY . .

RUN npx prisma init

FROM base as production

ENV NODE_PATH ./build

RUN npm run build
