FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies.
RUN npm install --only=productio

COPY . ./

EXPOSE 5000

CMD ["npm", "start"]

