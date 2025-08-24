FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./
COPY services/order-svc/package*.json ./services/order-svc/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

# Copy source code
COPY services/order-svc/ ./services/order-svc/
COPY tsconfig.json ./

# Build the application
RUN npm run build --workspace=services/order-svc

# Expose port
EXPOSE 3005

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3005/health || exit 1

# Start the application
CMD ["npm", "start", "--workspace=services/order-svc"]
