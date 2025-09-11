# Stage 1: Install dependencies and build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json tsconfig.json jsconfig.json next.config.ts ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/jsconfig.json ./

EXPOSE 3000

CMD ["npm", "start"]
