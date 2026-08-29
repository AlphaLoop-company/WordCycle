# Netlify 배포 안내 — 1인용 WordCycle

이 버전은 서버가 없는 정적 웹앱입니다. 따라서 Netlify Functions, Supabase, 환경변수가 필요하지 않습니다.

## 가장 쉬운 배포

### GitHub → Netlify

1. `wordcycle` 폴더 전체를 GitHub repository에 업로드합니다.
2. Netlify에서 새 사이트 생성을 선택합니다.
3. GitHub 저장소를 연결합니다.
4. Build command에 `npm run build`를 입력합니다.
5. Publish directory에 `dist`를 입력합니다.
6. Deploy를 실행합니다.

`netlify.toml`이 이미 들어 있으므로 값이 자동으로 인식될 수 있습니다.

## 로컬에서 직접 배포

```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

Netlify CLI가 없다면 먼저:

```bash
npm install -g netlify-cli
```

## SPA 라우팅

React Router를 사용하는 앱이므로 직접 `/statistics` 같은 주소로 접속해도 404가 나지 않도록 `netlify.toml`에 모든 경로를 `/index.html`로 rewrite하는 규칙을 넣었습니다.

## 이 버전에서 필요 없는 것

- 회원가입
- 로그인
- JWT
- Node/Express 서버
- Supabase
- SQL schema
- API 서버 환경변수
- Netlify Functions

## 학습 데이터 보존

이 앱의 학습 기록은 현재 사용하는 브라우저의 localStorage에 저장됩니다.

따라서:

- 같은 브라우저/기기에서 접속하면 계속 이어서 학습할 수 있습니다.
- 다른 기기에서는 자동 동기화되지 않습니다.
- 브라우저 저장 데이터를 지우면 진도가 사라질 수 있습니다.
- 설정 화면에서 JSON 백업을 만들어 둘 수 있습니다.

개인용으로는 이 구조가 가장 단순하고 유지비가 거의 없습니다.
