##### Stage 1
FROM node:lts AS node
LABEL author="claus"
WORKDIR /app
#COPY package.json package.json 
#RUN npm install
COPY ./dist/frontend/browser ./dist/frontend
#RUN npm run build --production

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/frontend /usr/share/nginx/html
COPY ./co2rechner.key /etc/nginx/co2rechner.key
COPY ./cert_co2rechner.cloud.crt /etc/nginx/cert_co2rechner.cloud.crt
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t spociii-frontend .
# docker build -t cmh1506/spociii-frontend:1.0.41 .
# docker push cmh1506/spociii-frontend:1.0.41
# docker run -d -p 8080:80 cmh1506/spociii-frontend:1.0.41