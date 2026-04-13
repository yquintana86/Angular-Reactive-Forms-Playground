FROM node:22-alpine AS base

WORKDIR /app

# Copy packages files
COPY package*.json ./

# Install dependencies
RUN npm install

# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy base dependencies
COPY --from=base /app/node_modules ./node_modules

# Copy app files
COPY . .

# Build app
RUN npx ng build --configuration production --base-href=/ --deploy-url=/


FROM nginx:alpine AS deploy

COPY --from=build /app/dist/form-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
