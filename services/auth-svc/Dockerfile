FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY services/auth-svc/package*.json ./services/auth-svc/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

# Copy source code
COPY services/auth-svc/ ./services/auth-svc/
COPY tsconfig.json ./

# Build the application
RUN npm run build --workspace=services/auth-svc

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["npm", "start", "--workspace=services/auth-svc"]
