##### Stage 1
FROM node:lts as node
LABEL author="claus"
WORKDIR /app
COPY package.json package.json 
RUN npm install
COPY . .
RUN npm run build

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/frontend /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


# docker build -t cmh1506/spociii-frontend:1.0.0 .
# docker push cmh1506/spociii-frontend:1.0.0
# docker run -d -p 8080:80 cmh1506/spociii-frontend:1.0.0