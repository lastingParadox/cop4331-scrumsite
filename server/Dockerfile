FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm","start"]
