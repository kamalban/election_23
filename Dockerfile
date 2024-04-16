FROM nginx:alpine
EXPOSE 80
RUN rm /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]