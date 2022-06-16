FROM node:18-alpine

WORKDIR "/var/www/html/docker-app/worker"

COPY ./package.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "start"]