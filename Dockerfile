FROM node:20-alpine

WORKDIR /app

# Copy file dependency
COPY package*.json ./
COPY prisma ./prisma/

# Install semua dependency
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npx tsc

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/main.js"]
