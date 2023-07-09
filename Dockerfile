# Base Image
FROM node:18

# Set Working Directory in the Container
WORKDIR /app

# Add the package.json and package-lock.json
COPY package*.json ./

# Install node modules
RUN npm install

# Copy everything from the current directory to the working directory in the container
COPY . .

# Build the project for production
RUN npm run build

# Install serve module globally
RUN npm install -g serve@11.3.2

# Expose a port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]