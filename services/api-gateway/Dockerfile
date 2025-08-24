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

# Build the application
RUN npm run build --workspace=services/api-gateway

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start", "--workspace=services/api-gateway"]
