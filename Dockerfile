FROM node:10.13.0

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest && npm ci --production

COPY . .

EXPOSE 3000
