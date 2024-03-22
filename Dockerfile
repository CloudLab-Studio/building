# Use a base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose a port (replace 3000 with the appropriate port for your application)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

