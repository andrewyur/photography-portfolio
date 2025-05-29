FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .

RUN npm i
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

ARG PLATFORM=x86_64
ADD https://github.com/andrewyur/cors-bypass-server/releases/download/1.0.2/cors-bypass-server-${PLATFORM} /usr/local/bin/cors-bypass-server

RUN chmod +x /usr/local/bin/cors-bypass-server

COPY nginx.conf /etc/nginx/nginx.conf

ENV PORT=9000
ENV WHITELIST=p129-sharedstreams.icloud.com
ENV RUST_LOG=debug

CMD ["sh", "-c", "/usr/local/bin/cors-bypass-server & nginx -g 'daemon off;'"]
