# docker build -t [name] [dir]
# docker run [-it or -d (for deamon)] [optional:-p port] [name]
# docker ps (if you choose -d, for see all docker image)
# docker run -it -v $(pwd)/app [name]
FROM node:12-slim

WORKDIR /app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3005
CMD ["npm", "start"]