# Stage 1: Build the application
FROM node:18 as build-step

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:latest
COPY --from=build-step /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
