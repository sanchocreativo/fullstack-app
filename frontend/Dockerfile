# syntax = docker/dockerfile:1

# Stage 1: Build the React application
FROM node:16-slim as build

LABEL fly_launch_runtime="Node.js"

# Set the working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python3 && \
    ln -sf /usr/bin/python3 /usr/bin/python && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application source
COPY . .

# Build the application
RUN yarn run build


# Stage 2: Serve the React application
FROM nginx:stable

# Copy built application to Nginx's default public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Start Nginx by default
CMD ["nginx", "-g", "daemon off;"]
