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
ENV mongodb+srv://maaz:tpx4NLw19hNsP6ra@cluster0.p93tfip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todo_production
ENV PORT=5000

# Change to the backend directory
WORKDIR /usr/src/app/backend

# Run the application
CMD ["node", "index.js"]
