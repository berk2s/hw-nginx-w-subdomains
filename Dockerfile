FROM nginx
ADD /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /html /usr/share/nginx/html
WORKDIR /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
