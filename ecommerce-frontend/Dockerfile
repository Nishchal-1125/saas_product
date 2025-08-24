# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY ecommerce-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ecommerce-frontend/ .

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
