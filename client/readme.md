# Magnet Client - 멘토링 플랫폼 프론트엔드

> **🚀 백엔드 독립형 모드로 구성됨**  
> 이 프로젝트는 백엔드 서버 없이도 완전히 작동하도록 설정되어 있습니다.

## 📋 개요

멘토와 멘티를 연결하는 온라인 멘토링 플랫폼의 React 기반 프론트엔드 애플리케이션입니다.

### 🛠 기술 스택
- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Mock Server**: JSON Server

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행

**터미널 1 - Mock API 서버 실행:**
```bash
npm run server
```
- Mock API가 http://localhost:3001 에서 실행됩니다

**터미널 2 - React 앱 실행:**
```bash
npm start
```
- 앱이 http://localhost:3000 에서 실행됩니다

### 3. 테스트 계정으로 로그인
- 이메일: `demo@example.com`
- 비밀번호: `password123`

## 📁 프로젝트 구조

```
src/
├── api/                 # API 레이어 (모킹됨)
├── component/           # 재사용 가능한 컴포넌트
├── pages/              # 페이지 컴포넌트
├── store/              # Zustand 상태 관리
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── schema/             # Zod 유효성 검사 스키마
```

## 🔧 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm start` | 개발 모드로 React 앱 실행 |
| `npm run server` | JSON Server로 Mock API 실행 |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm test` | 테스트 실행 |
| `npm run deploy` | GitHub Pages에 배포 |

## 🎯 주요 기능

### ✅ 구현된 기능
- [x] 회원가입/로그인 (모킹)
- [x] 멘토 프로필 조회
- [x] 멘토링 리스트 및 상세보기
- [x] 카테고리별 필터링
- [x] 멘토링 신청 및 결제 (시뮬레이션)
- [x] 사용자 프로필 관리

### 🌟 모킹된 데이터
- **3명의 샘플 멘토**: 백엔드, 프론트엔드, 풀스택 전문가
- **6개의 멘토링 프로그램**: 다양한 기술 스택과 난이도
- **완전한 인증 플로우**: 토큰 기반 인증 시뮬레이션
- **결제 시스템**: Toss Payments 시뮬레이션

## 🔒 백엔드 독립성

이 프로젝트는 **완전히 독립적**으로 실행됩니다:

- ✅ 환경변수 기본값 설정
- ✅ Mock API 서버 (JSON Server)
- ✅ 인증 토큰 시뮬레이션
- ✅ 결제 플로우 모킹
- ✅ 404 에러 처리

## 📝 API 엔드포인트 (모킹됨)

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| GET | `/mentors` | 멘토 리스트 조회 |
| GET | `/mentorings` | 멘토링 프로그램 조회 |
| POST | `/members` | 회원가입 |
| GET | `/members?email=` | 로그인 |
| POST | `/mentees` | 멘토링 신청 |
| POST | `/payments` | 결제 정보 저장 |

## 🎨 커스터마이징

### 환경변수 (.env)
```bash
REACT_APP_BASE_URL=http://localhost:3001  # Mock API URL
REACT_APP_URL=http://localhost:3000       # 앱 URL
REACT_APP_TOSS_CLIENT_KEY=test_key        # 테스트용 키
```

### Mock 데이터 수정
`db.json` 파일을 편집하여 샘플 데이터를 변경할 수 있습니다.

## 🚨 주의사항

- 이것은 **시연용 모킹 환경**입니다
- 실제 데이터는 저장되지 않으며, 서버 재시작 시 초기화됩니다
- 결제 기능은 시뮬레이션이므로 실제 결제가 발생하지 않습니다

## 📖 추가 문서

- [CLAUDE.md](./CLAUDE.md) - 개발 가이드라인
- [MOCK_README.md](./MOCK_README.md) - 모킹 환경 상세 가이드

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**💡 이 프로젝트는 백엔드 서버 없이도 완전히 작동하도록 설계되었습니다.**