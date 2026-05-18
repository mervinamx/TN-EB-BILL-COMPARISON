# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
# copy only frontend package files first for better caching
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
# copy frontend source
COPY frontend/ .
RUN npm run build

# ── Stage 2: Serve via Nginx ─────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
