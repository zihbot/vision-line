FROM node:16-alpine as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN ["yarn", "install"]

COPY . .
RUN ["yarn", "build"]

FROM nginx:latest

COPY "/nginx/${ENV_NAME}.conf" /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]