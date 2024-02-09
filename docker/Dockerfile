FROM node:19-alpine3.16
WORKDIR /app
COPY /package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8082