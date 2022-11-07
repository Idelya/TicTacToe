FROM node:14.21.0-alpine3.16

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# add app
COPY . ./

# start app
EXPOSE 3000
CMD ["yarn", "start"]