FROM node:18-alpine as base

WORKDIR /app

COPY . .

ENV DB_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_PATH}

RUN npm i

COPY . .

RUN npx prisma init

FROM base as production

ENV NODE_PATH ./build

RUN npm run build
