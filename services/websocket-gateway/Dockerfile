FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./
COPY services/websocket-gateway/package*.json ./services/websocket-gateway/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

# Copy source code
COPY services/websocket-gateway/ ./services/websocket-gateway/
COPY tsconfig.json ./

# Build the application
RUN npm run build --workspace=services/websocket-gateway

# Expose port
EXPOSE 3008

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3008/health || exit 1

# Start the application
CMD ["npm", "start", "--workspace=services/websocket-gateway"]
