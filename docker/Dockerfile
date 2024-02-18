FROM node:19-alpine3.16
WORKDIR /app
COPY /package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000