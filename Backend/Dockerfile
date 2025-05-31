# 1단계: Gradle Build를 포함
FROM gradle:8.5-jdk21 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# Gradle 의존성 캐싱을 위해 먼저 복사
COPY build.gradle settings.gradle ./
RUN gradle build --no-daemon || true

# 전체 프로젝트 복사
COPY . .

# 다시 build (이제 소스까지 포함되어 있으므로 진짜 빌드)
RUN gradle clean build -x test --no-daemon

# 2단계: 실행 환경
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# 빌드 산출물 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 포트 오픈
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
