# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any dependencies
RUN npm install

# Set the NODE_ENV environment variable to 'production' for a deployed version
ENV NODE_ENV production

# Expose port 3000
EXPOSE 3000

# Run npm start for a deployed version, or npm run dev for a development version
CMD [ "npm", "start" ]
