# Application Dockerfile
FROM node:18-alpine

# Install necessary dependencies
RUN apk add --no-cache python3 make gcc g++ git

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
