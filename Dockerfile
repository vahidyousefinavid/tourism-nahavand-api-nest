# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --prefer-offline --no-audit --progress=false

COPY . .

RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/main.js"]
