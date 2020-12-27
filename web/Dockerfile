FROM node:14.15.3-alpine3.12 as build

RUN mkdir -p /usr/src/app/public
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
COPY public /usr/src/app/public/
COPY src /usr/src/app/src/

RUN yarn && yarn build

#CMD [ "yarn", "start" ]

FROM nginx:alpine

COPY /nginx/nginx.conf /etc/nginx/
COPY --from=build /usr/src/app/build /frontend/dist
