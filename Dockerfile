FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .

RUN npm i
RUN npm run build

FROM ghcr.io/static-web-server/static-web-server:2
WORKDIR /app
COPY --from=builder /app /app/

CMD ["--port", "8080",  "--root",  "/app"]