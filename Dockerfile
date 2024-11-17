FROM node:22-alpine AS buider

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM node:22-alpine AS final

WORKDIR /app

COPY --from=buider /app /app

EXPOSE ${PORT}

CMD [ "npm","run","start:dev:migrate" ]