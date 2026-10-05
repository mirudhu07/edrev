# Dockerfile for EduSense IoT – Multi-MCU & Sensor Kit Production Deployment
FROM node:22-alpine

WORKDIR /app

# Copy package definitions
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN cd client && npm ci --legacy-peer-deps
RUN cd server && npm ci --legacy-peer-deps
RUN npm ci --legacy-peer-deps

# Copy application source
COPY . .

# Build Vite static bundle into client/dist
RUN npm run build

# Expose target application port
EXPOSE 3001

# Production Environment Settings
ENV NODE_ENV=production
ENV PORT=3001

# Production Start Command
CMD ["npm", "start"]
