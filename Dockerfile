# Application Dockerfile
FROM ubuntu:20.04

# Install Node.js 18
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install necessary dependencies
RUN apt-get install -y python3 make gcc g++ build-essential

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
