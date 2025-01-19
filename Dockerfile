# Stage 1: Build the application
FROM node:18.20.5 as build
WORKDIR /tmp/app
RUN corepack enable && corepack prepare pnpm@latest-10 --activate
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm build

# Stage 2: Production setup
FROM nginx:stable-alpine as production
# Use /tmp for Nginx operations
RUN mkdir -p /tmp/nginx/client_temp /tmp/nginx/proxy_temp /tmp/nginx/fastcgi_temp && \
    chmod -R 777 /tmp/nginx
COPY --from=build /tmp/app/dist /tmp/nginx/html
# Custom Nginx configuration using /tmp paths
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
