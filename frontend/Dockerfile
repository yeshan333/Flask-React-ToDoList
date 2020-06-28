FROM node:12.18-alpine as frontend-react

LABEL maintainer = "yeshan <yeshan1329441308@gmail.com>"

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install && npm install -g serve

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["serve", "-l", "tcp://0.0.0.0:5000", "-s", "build"]