FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY services/api-gateway/package*.json ./services/api-gateway/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

# Copy source code
COPY services/api-gateway/ ./services/api-gateway/
COPY tsconfig.json ./

# Install ts-node for runtime
RUN npm install -g ts-node typescript

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start the application with ts-node
CMD ["npx", "ts-node", "services/api-gateway/src/main.ts"]
