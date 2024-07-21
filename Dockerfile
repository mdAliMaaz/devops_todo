# Use the official Node.js image as the base image
FROM node:alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy both backend and frontend package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install backend dependencies
RUN npm install

# Install frontend dependencies
RUN npm install --prefix frontend

# Copy backend files
COPY . .

# Build the frontend
RUN npm run build --prefix frontend

# Expose the port the app runs on
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=production
ENV MONGO_URI=mongodb+srv://maaz:28582858@cluster0.6c5n5cq.mongodb.net/todo_prod
ENV PORT=5000


# Change to the backend directory
WORKDIR /usr/src/app/backend

# Run the application
CMD ["node", "index.js"]
