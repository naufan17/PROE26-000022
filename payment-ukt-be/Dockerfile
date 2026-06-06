# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install OpenSSL (required for Prisma)
RUN apk add --no-cache openssl

COPY package*.json .
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install OpenSSL (required for Prisma)
RUN apk add --no-cache openssl

COPY --from=builder /app/package*.json .
RUN npm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]
