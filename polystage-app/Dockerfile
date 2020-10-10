# Create image based on the official Node 10 image from dockerhub
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app
RUN npm install
RUN npm install -g react
RUN npm install typescript

# add app
COPY . /app

# start app
CMD ["npm", "start"]