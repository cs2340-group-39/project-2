FROM nginx:latest

COPY ./production.conf /etc/nginx/conf.d/default.conf
