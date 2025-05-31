# 1단계: 빌드
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# 2단계: nginx에 배포
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 기본 설정 덮어쓰기 (선택사항)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
