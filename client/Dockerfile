FROM node:18-alpine as builder

WORKDIR /var/www/html/docker-app/client

COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:1.21-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
COPY --from=builder /var/www/html/docker-app/client/build /usr/share/nginx/html/client