FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate

EXPOSE 8000

CMD [ "node", "index.js" ]