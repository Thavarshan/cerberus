# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port on which your NestJS application is running
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
