FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY services/cart-svc/package*.json ./

# Install dependencies
RUN npm install

# Copy source code and libs
COPY services/cart-svc/src ./src
COPY libs/ ./libs/
COPY services/cart-svc/tsconfig*.json ./
COPY services/cart-svc/nest-cli.json ./

# Install ts-node for running TypeScript directly
RUN npm install -g ts-node

# Expose port
EXPOSE 12000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:12000/health || exit 1

# Start the application directly with ts-node
CMD ["npx", "ts-node", "src/main.ts"]
