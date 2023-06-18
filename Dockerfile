FROM node:18-alpine as base

WORKDIR /app

COPY . .

RUN npm i

ENV DB_URL postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_PATH}

RUN npx prisma generate

FROM base as production

ENV NODE_PATH ./build

RUN npm run dev
