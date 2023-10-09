FROM node:16.15.1 as builder

WORKDIR /node

COPY package* tsconfig.json  ./

COPY . .

RUN npm install && npm run build


FROM node:16.15.1-alpine3.15

WORKDIR /app

COPY package* tsconfig.json  ./

COPY --from=builder /node/build /app

RUN npm install

EXPOSE 3000

CMD npm start
