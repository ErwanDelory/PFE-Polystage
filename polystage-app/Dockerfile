# Create image based on the official Node 10 image from dockerhub
FROM node:12

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app
RUN npm install

# add app
COPY . /app

# start app
CMD ["npm", "start"]