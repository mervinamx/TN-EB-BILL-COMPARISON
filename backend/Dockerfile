FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json ./
RUN npm install --omit=dev

COPY . .

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 && \
    chown -R nodeuser:nodejs /app

USER nodeuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "src/index.js"]
