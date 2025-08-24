FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./
COPY services/catalog-svc/package*.json ./services/catalog-svc/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

# Copy source code
COPY services/catalog-svc/ ./services/catalog-svc/
COPY tsconfig.json ./

# Build the application
RUN npm run build --workspace=services/catalog-svc

# Expose port
EXPOSE 3003

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3003/health || exit 1

# Start the application
CMD ["npm", "start", "--workspace=services/catalog-svc"]
