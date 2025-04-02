# 🧼 Fullstack Cleaning Service 프로젝트 문서

## 📁 프로젝트 개요
청소 서비스 회사를 위한 견적 문의 및 예약 시스템을 개발하는 풀스택 웹 애플리케이션입니다. 고객은 웹사이트를 통해 견적 요청을 보내고, 관리자는 이를 확인하고 이메일로 알림을 받을 수 있습니다.

---

## 🛠️ 기술 스택

### ✅ Frontend
- Vite
- React.js
- Tailwind CSS
- Axios (API 통신)

### ✅ Backend
- Spring Boot 3.4.4
- Java 21
- MyBatis
- Oracle DB
- Gradle

### ✅ 기타
- Git & GitHub
- Postman (API 테스트)
- DBeaver (DB 접속 도구)

---

## 📦 프로젝트 구조
```
Fullstack-cleaning-service/
├── backend/               # Spring Boot 프로젝트
│   ├── src/main/java/com/cleaning/backend
│   ├── resources/mapper/QuoteRequestMapper.xml
│   ├── build.gradle
│   └── application.properties
├── frontend/              # Vite + React 프로젝트
│   ├── src/
│   ├── index.html
│   └── vite.config.js
├── .gitignore
├── README.md              # 프로젝트 요약 문서
└── DEV_HISTORY.md         # 개발 히스토리 정리
```

---

## ✨ 주요 기능
- 고객 견적 요청 입력 폼
- 입력 유효성 검사
- 견적 요청 내역 DB 저장
- 이메일 자동 전송 (Spring Mail)

---

## 🔐 DB 정보 (로컬 개발용)
- **URL**: `jdbc:oracle:thin:@localhost:1521:ORCL`
- **계정**: `CLEAN_SERVICE`
- **비밀번호**: `clean`
- **시퀀스**: `QUOTE_REQUEST_SEQ_MY`

---

## 🚀 실행 방법

### 1. Backend 실행
```bash
cd backend
./gradlew build -x test
./gradlew bootRun
```

### 2. Frontend 실행
```bash
cd frontend
npm install
npm run dev
```

---

## 🗂️ 개발 히스토리 요약

### ✅ 초기 세팅
- Java 21로 프로젝트 구성 (Gradle 기반)
- Backend: Spring Boot + MyBatis + Oracle
- Frontend: React + Vite + Tailwind

### 🔧 이슈 해결 기록
- **시퀀스 오류 (ORA-02289)**  
  > SYSTEM 계정으로 생성된 중복 시퀀스를 제거하고 CLEAN_SERVICE 계정에만 남김

- **문자셋 오류 (ORA-17056)**  
  > orai18n.jar 수동 다운로드 → `libs/` 폴더에 복사 → 실행 시 JVM 인자 추가

- **Gradle Java toolchain 에러**  
  > Java 17 명시 및 환경 변수 수정

- **MyBatis Mapper 오류**  
  > `typeAlias` 경로 설정 누락으로 인한 매핑 실패 → 경로 수정

- **Postman 테스트 500 에러**  
  > Mapper XML의 SQL 문법, DTO/Model 경로 문제 수정 → DB 정상 저장 확인

### 🚀 마무리 작업
- Git 초기화 및 .gitignore 설정
- 프로젝트 문서 작성 (README, DEV_HISTORY)
- GitHub 저장소 업로드
- Notion 연동용 문서 정리

