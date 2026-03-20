FROM node:22-alpine
RUN mkdir -p /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]
