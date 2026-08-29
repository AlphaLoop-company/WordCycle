# WordCycle — 1인용

설계서의 학습 사이클을 유지하면서, 혼자 사용하는 상황에 맞춰 인증·서버·외부 DB를 모두 제거한 버전입니다.

## 핵심 구조

React + Vite + localStorage

- 회원가입/로그인 없음
- Node/Express 백엔드 없음
- Supabase/DB 없음
- 학습 진도·오답·통계는 현재 브라우저에 저장
- 브라우저 TTS로 발음 재생
- Netlify에는 정적 사이트만 배포

## 포함 기능

- 오늘의 신규 단어 10개
- 학습중인 단어장
- 학습한 단어장
- 오답 단어장
- 단어 상세/품사/뜻/예문/발음
- 한글 → 영어 / 영어 → 한글 주관식 테스트
- 오답 자동 표시 및 복습
- 오늘 배운 단어 반복
- 랜덤 10문제
- 기본 통계와 세션 기록
- 모바일 반응형 UI
- JSON 백업/복원
- 데이터 초기화

## 로컬 실행

Node.js가 설치된 환경에서:

```bash
npm install
npm run dev
```

브라우저에서 Vite가 안내하는 주소를 엽니다.

## 빌드

```bash
npm run build
npm run preview
```

## Netlify 배포

### 방법 1 — GitHub 연결
1. 이 폴더를 GitHub 저장소로 올립니다.
2. Netlify에서 `Add new project` → `Import an existing project`를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. 배포합니다.

`netlify.toml`이 포함되어 있으므로 설정을 그대로 사용해도 됩니다.

### 방법 2 — Netlify CLI

```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

첫 실행에서는 Netlify 로그인 및 사이트 연결 과정이 표시됩니다.

## 데이터 주의사항

학습 데이터는 브라우저 localStorage에 저장됩니다. 따라서 같은 브라우저/기기에서는 유지되지만, 다른 기기와 자동 동기화되지 않습니다.

브라우저 데이터를 삭제하면 학습 기록이 사라질 수 있으므로 `설정 → JSON 백업 다운로드`를 주기적으로 사용하는 것을 권장합니다.

백업 파일은 다른 곳에 안전하게 보관하고, 복원할 때 `설정 → JSON 백업 가져오기`를 사용합니다.

## 추천 사용법

1. 처음 접속하면 `오늘 학습 시작`
2. 신규 단어 10개를 학습
3. 단어 학습을 완료한 뒤 필요한 테스트 수행
4. 틀린 단어는 오답 상태로 자동 기록
5. 다음 접속 시 오답 복습
6. 여유가 있을 때 랜덤 테스트/오늘 단어 반복

## 재배포

이 프로젝트는 외부 DB나 서버가 필요하지 않으므로 Netlify에 한 번 배포해 두고 개인 학습용으로 사용할 수 있습니다.
