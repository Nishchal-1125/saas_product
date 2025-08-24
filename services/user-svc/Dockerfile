FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./
COPY services/user-svc/package*.json ./services/user-svc/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

# Copy source code
COPY services/user-svc/ ./services/user-svc/
COPY tsconfig.json ./

# Build the application
RUN npm run build --workspace=services/user-svc

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3002/health || exit 1

# Start the application
CMD ["npm", "start", "--workspace=services/user-svc"]
