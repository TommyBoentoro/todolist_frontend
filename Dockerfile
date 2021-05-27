# Base Image : Dimana aplikasi akan running
FROM node:latest

# Create Folder
RUN mkdir /app

# Set Default working directory
WORKDIR /app

# Copy all files to working directory
COPY . ./

# Run command to install all packgages
RUN npm install

# Default container port
EXPOSE 3000

# Running project
CMD ["npm", "start"]