# Intentional Vulnerability 3: Highly outdated base image with known CVEs
FROM node:14.0.0-alpine 

WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy application code
COPY app.js .

# A fake test file to generate a False Positive later
RUN echo "password=TestEnvironmentPassword123" > test-config.txt

CMD ["npm", "start"]