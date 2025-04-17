FROM node:slim

WORKDIR /app
COPY dist/ /app/dist
