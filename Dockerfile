FROM node:18-slim

# Install FFmpeg for video processing
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Create uploads and renders directories
RUN mkdir -p uploads renders temp

# Expose port
EXPOSE 7860

# Start the app
CMD ["npm", "start"]
