# Application Dockerfile
FROM ubuntu:20.04

# Install Node.js 20 and necessary dependencies
RUN apt-get update && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs python3 make gcc build-essential

# Set memory limits and environment variables
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy and install the application dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]
