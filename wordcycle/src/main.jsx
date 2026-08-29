import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import './styles.css'

const STORAGE_KEY = 'wordcycle_single_user_v2'

const RAW_WORDS = [
['abandon','verb','버리다, 포기하다',3,'He decided to abandon the plan.','그는 그 계획을 포기하기로 했다.'],
['achieve','verb','성취하다, 달성하다',2,'She worked hard to achieve her goal.','그녀는 목표를 달성하기 위해 열심히 노력했다.'],
['acquire','verb','습득하다, 얻다',4,'Children acquire language quickly.','아이들은 언어를 빠르게 습득한다.'],
['adequate','adjective','충분한, 적절한',3,'The room is adequate for our needs.','그 방은 우리의 필요에 충분하다.'],
['ancient','adjective','고대의, 아주 오래된',2,'We studied an ancient civilization.','우리는 고대 문명을 공부했다.'],
['approach','verb','접근하다, 다가가다',3,'A storm began to approach the coast.','폭풍이 해안에 다가오기 시작했다.'],
['benefit','noun','이점, 혜택',2,'Exercise has many health benefits.','운동은 건강에 많은 이점이 있다.'],
['complex','adjective','복잡한',3,'The problem is more complex than it looks.','그 문제는 보이는 것보다 더 복잡하다.'],
['concept','noun','개념',3,'The teacher explained the concept clearly.','선생님은 그 개념을 명확히 설명했다.'],
['conclude','verb','결론짓다, 끝내다',4,'We can conclude that the test worked.','우리는 그 시험이 효과가 있었다고 결론지을 수 있다.'],
['conduct','verb','수행하다, 실시하다',4,'The team will conduct a survey.','그 팀은 설문조사를 실시할 것이다.'],
['constant','adjective','끊임없는, 일정한',3,'The machine needs a constant supply of power.','그 기계에는 일정한 전력 공급이 필요하다.'],
['create','verb','창조하다, 만들다',1,'We can create a new plan.','우리는 새로운 계획을 만들 수 있다.'],
['decline','verb','감소하다, 거절하다',3,'Sales began to decline.','판매량이 감소하기 시작했다.'],
['define','verb','정의하다, 규정하다',3,'Can you define the word?','그 단어를 정의할 수 있나요?'],
['demonstrate','verb','보여주다, 입증하다',4,'The experiment demonstrates the idea.','그 실험은 그 생각을 입증한다.'],
['derive','verb','끌어내다, 유래하다',4,'The word derives from Latin.','그 단어는 라틴어에서 유래한다.'],
['demand','noun','수요, 요구',2,'There is high demand for this product.','이 제품에 대한 수요가 높다.'],
['despite','preposition','~에도 불구하고',3,'Despite the rain, we went outside.','비에도 불구하고 우리는 밖에 나갔다.'],
['distinct','adjective','뚜렷한, 별개의',4,'The two sounds are distinct.','두 소리는 뚜렷하다.'],
['efficient','adjective','효율적인',3,'This method is more efficient.','이 방법이 더 효율적이다.'],
['emerge','verb','나타나다, 부상하다',3,'A solution began to emerge.','해결책이 나타나기 시작했다.'],
['establish','verb','설립하다, 확립하다',4,'They established a new school.','그들은 새 학교를 설립했다.'],
['evaluate','verb','평가하다',4,'We need to evaluate the results.','우리는 결과를 평가해야 한다.'],
['eventually','adverb','결국, 마침내',2,'Eventually, he found the answer.','결국 그는 답을 찾았다.'],
['evidence','noun','증거',3,'There is strong evidence for the claim.','그 주장에 대한 강한 증거가 있다.'],
['expand','verb','확장하다, 늘리다',2,'The company plans to expand.','그 회사는 확장할 계획이다.'],
['factor','noun','요인',3,'Cost is an important factor.','비용은 중요한 요인이다.'],
['feature','noun','특징, 기능',2,'The app has a useful feature.','그 앱에는 유용한 기능이 있다.'],
['generate','verb','생성하다, 발생시키다',4,'The engine can generate power.','그 엔진은 전력을 생성할 수 있다.'],
['impact','noun','영향, 충격',3,'The change had a major impact.','그 변화는 큰 영향을 미쳤다.'],
['indicate','verb','나타내다, 가리키다',3,'The sign indicates the exit.','그 표시는 출구를 가리킨다.'],
['interpret','verb','해석하다',4,'Different readers may interpret it differently.','독자마다 그것을 다르게 해석할 수 있다.'],
['maintain','verb','유지하다',4,'It is difficult to maintain focus.','집중력을 유지하기는 어렵다.'],
['method','noun','방법',2,'This method saves time.','이 방법은 시간을 절약한다.'],
['occur','verb','발생하다',3,'Accidents can occur at any time.','사고는 언제든 발생한다.'],
['obtain','verb','얻다, 획득하다',4,'You must obtain permission first.','먼저 허가를 받아야 한다.'],
['participate','verb','참여하다',3,'Many students participate in the event.','많은 학생이 행사에 참여한다.'],
['perceive','verb','인식하다, 감지하다',5,'People perceive colors differently.','사람들은 색을 다르게 인식한다.'],
['potential','adjective','잠재적인',3,'The project has great potential.','그 프로젝트는 큰 잠재력이 있다.'],
['previous','adjective','이전의',2,'Use the previous example.','이전 예시를 사용하세요.'],
['primary','adjective','주요한, 주된',2,'Safety is our primary concern.','안전이 우리의 주요 관심사다.'],
['proceed','verb','진행하다',4,'We can proceed with the plan.','우리는 계획을 진행할 수 있다.'],
['require','verb','요구하다, 필요로 하다',2,'This task requires patience.','이 작업에는 인내심이 필요하다.'],
['respond','verb','응답하다, 대응하다',2,'Please respond to the message.','메시지에 답해 주세요.'],
['significant','adjective','중요한, 상당한',4,'There was a significant change.','상당한 변화가 있었다.'],
['similar','adjective','비슷한',2,'The two ideas are similar.','두 생각은 비슷하다.'],
['specific','adjective','구체적인, 특정한',2,'Give me a specific example.','구체적인 예를 하나 들어 주세요.'],
['sufficient','adjective','충분한',4,'We have sufficient time.','우리에게는 충분한 시간이 있다.'],
['temporary','adjective','임시의, 일시적인',3,'This is only a temporary solution.','이것은 단지 임시 해결책이다.'],
['theory','noun','이론',3,'The theory explains the result.','그 이론은 결과를 설명한다.'],
['transform','verb','변형하다, 바꾸다',4,'Technology can transform our lives.','기술은 우리의 삶을 바꿀 수 있다.'],
['ultimate','adjective','궁극적인, 최종의',4,'That is our ultimate goal.','그것이 우리의 궁극적인 목표다.'],
['vary','verb','다르다, 변하다',3,'Prices vary by season.','가격은 계절에 따라 달라진다.'],
['accurate','adjective','정확한',3,'Make sure the information is accurate.','정보가 정확한지 확인하세요.'],
['adapt','verb','적응하다, 맞추다',3,'We must adapt to change.','우리는 변화에 적응해야 한다.'],
['annual','adjective','연간의',2,'The report is published annually.','그 보고서는 매년 발행된다.'],
['apparent','adjective','명백한, 분명한',4,'The reason soon became apparent.','그 이유는 곧 명백해졌다.'],
['appropriate','adjective','적절한',3,'Choose an appropriate example.','적절한 예를 고르세요.'],
['approximate','adjective','대략적인',4,'The approximate time is noon.','대략적인 시간은 정오다.'],
['assume','verb','가정하다, 추정하다',3,'Do not assume the answer.','답을 함부로 가정하지 마세요.'],
['capacity','noun','능력, 수용력',3,'The hall has a large capacity.','그 홀은 수용 인원이 많다.'],
['challenge','noun','도전, 난관',2,'Learning a language is a challenge.','언어를 배우는 것은 도전이다.'],
['coherent','adjective','일관성 있는, 논리적인',5,'Her explanation was coherent.','그녀의 설명은 논리적이었다.'],
['contribute','verb','기여하다',3,'Everyone can contribute an idea.','모두가 아이디어 하나를 기여할 수 있다.'],
['convert','verb','전환하다, 바꾸다',4,'We can convert the file to PDF.','파일을 PDF로 변환할 수 있다.'],
['crucial','adjective','결정적인, 중대한',4,'Timing is crucial.','타이밍이 결정적이다.'],
['data','noun','자료, 데이터',2,'The data supports the conclusion.','자료가 그 결론을 뒷받침한다.'],
['distribute','verb','분배하다, 배포하다',4,'They distribute books to students.','그들은 학생들에게 책을 배포한다.'],
['domestic','adjective','국내의, 가정의',3,'The company serves the domestic market.','그 회사는 국내 시장을 대상으로 한다.'],
['eliminate','verb','제거하다, 없애다',4,'We need to eliminate errors.','우리는 오류를 제거해야 한다.'],
['enhance','verb','향상시키다, 강화하다',4,'Practice can enhance your skills.','연습은 실력을 향상시킬 수 있다.'],
['explicit','adjective','명시적인, 분명한',5,'The rules are explicit.','규칙은 명확하게 명시되어 있다.'],
['flexible','adjective','유연한',3,'The schedule is flexible.','일정은 유연하다.'],
['fundamental','adjective','기본적인, 근본적인',4,'Reading is a fundamental skill.','읽기는 기본적인 능력이다.'],
['identify','verb','식별하다, 확인하다',2,'Can you identify the problem?','문제를 확인할 수 있나요?'],
['implement','verb','시행하다, 구현하다',4,'The team will implement the plan.','팀은 계획을 시행할 것이다.'],
['inhibit','verb','억제하다, 방해하다',5,'Fear can inhibit learning.','두려움은 학습을 방해할 수 있다.'],
['initial','adjective','초기의',3,'This is the initial version.','이것이 초기 버전이다.'],
['justify','verb','정당화하다',5,'Can you justify the decision?','그 결정을 정당화할 수 있나요?'],
['logical','adjective','논리적인',3,'Your argument is logical.','당신의 주장은 논리적이다.'],
['modify','verb','수정하다, 변경하다',3,'We need to modify the design.','우리는 디자인을 수정해야 한다.'],
['notion','noun','개념, 생각',4,'He rejected the notion completely.','그는 그 생각을 완전히 거부했다.'],
['obvious','adjective','명백한',1,'The answer is obvious.','답은 명백하다.'],
['precise','adjective','정밀한, 정확한',4,'We need a precise measurement.','정밀한 측정이 필요하다.'],
['priority','noun','우선순위',3,'Safety is the top priority.','안전이 최우선이다.'],
['proportion','noun','비율',4,'A large proportion agreed.','많은 비율이 동의했다.'],
['relevant','adjective','관련 있는, 적절한',4,'Please provide relevant information.','관련 있는 정보를 제공해 주세요.'],
['reliable','adjective','신뢰할 수 있는',3,'Use a reliable source.','신뢰할 수 있는 출처를 사용하세요.'],
['resolve','verb','해결하다, 결심하다',3,'We must resolve the issue.','우리는 문제를 해결해야 한다.'],
['retain','verb','유지하다, 보유하다',4,'Sleep helps retain new information.','수면은 새로운 정보를 기억하는 데 도움이 된다.'],
['sequence','noun','순서, 연속',4,'Follow the sequence carefully.','순서를 주의 깊게 따르세요.'],
['stable','adjective','안정적인',3,'The system is stable now.','시스템은 이제 안정적이다.'],
['strategy','noun','전략',3,'We need a better strategy.','우리는 더 좋은 전략이 필요하다.'],
['submit','verb','제출하다',2,'Please submit your answer.','답을 제출해 주세요.'],
['undertake','verb','착수하다, 맡다',5,'She agreed to undertake the task.','그녀는 그 일을 맡기로 했다.'],
['valid','adjective','유효한, 타당한',3,'That is a valid point.','그것은 타당한 지적이다.'],
['version','noun','버전, 판',2,'Install the latest version.','최신 버전을 설치하세요.'],
['withdraw','verb','철회하다, 물러나다',4,'He decided to withdraw the request.','그는 요청을 철회하기로 했다.'],
['widespread','adjective','널리 퍼진',4,'The update received widespread attention.','그 업데이트는 널리 주목받았다.'],
['alternative','noun','대안',3,'We need an alternative plan.','우리는 대안 계획이 필요하다.'],
['consistent','adjective','일관된',4,'Her results are consistent.','그녀의 결과는 일관적이다.'],
['context','noun','맥락, 문맥',3,'The meaning depends on context.','의미는 맥락에 따라 달라진다.'],
['dominate','verb','지배하다, 장악하다',4,'One team began to dominate.','한 팀이 경기를 장악하기 시작했다.'],
['emphasize','verb','강조하다',3,'The teacher emphasized the key idea.','선생님은 핵심 생각을 강조했다.'],
['exclude','verb','제외하다',3,'Do not exclude the final result.','최종 결과를 제외하지 마세요.'],
['prior','adjective','이전의, 먼저의',3,'Review the prior lesson.','이전 수업을 복습하세요.'],
['regulate','verb','규제하다, 조절하다',4,'Rules regulate the process.','규칙은 그 과정을 조절한다.'],
['utilize','verb','활용하다',4,'Utilize the available tools.','사용 가능한 도구를 활용하세요.'],
['whereas','conjunction','~인 반면에',4,'He likes tea, whereas she prefers coffee.','그는 차를 좋아하는 반면 그녀는 커피를 더 좋아한다.'],
['accompany','verb','동반하다, 함께 가다',3,'A guide will accompany the group.','가이드가 그 그룹과 함께 간다.'],
['allocate','verb','할당하다, 배분하다',4,'We need to allocate more time.','우리는 더 많은 시간을 할당해야 한다.'],
['clarify','verb','명확히 하다',3,'Please clarify your point.','당신의 요점을 명확히 해 주세요.'],
['compile','verb','편집하다, 모으다',4,'She compiled the results into a report.','그녀는 결과를 보고서로 모았다.'],
['comprehensive','adjective','포괄적인',5,'The guide provides comprehensive coverage.','그 안내서는 포괄적인 내용을 제공한다.'],
['contemporary','adjective','동시대의, 현대의',4,'We studied contemporary art.','우리는 현대 미술을 공부했다.'],
['diminish','verb','감소하다, 약화시키다',4,'The pain began to diminish.','통증이 줄어들기 시작했다.'],
['feasible','adjective','실행 가능한',5,'The plan is feasible.','그 계획은 실행 가능하다.'],
['inevitable','adjective','불가피한',5,'Change is inevitable.','변화는 불가피하다.'],
['integrate','verb','통합하다',4,'We need to integrate the new system.','우리는 새 시스템을 통합해야 한다.'],
['manipulate','verb','조작하다, 다루다',5,'The device can manipulate data quickly.','그 장치는 데이터를 빠르게 다룰 수 있다.'],
['nevertheless','adverb','그럼에도 불구하고',4,'It was difficult; nevertheless, we continued.','어려웠지만 그럼에도 우리는 계속했다.'],
['predominant','adjective','지배적인, 주요한',5,'Blue is the predominant color.','파란색이 주된 색이다.'],
['subsequent','adjective','그 다음의, 후속의',5,'The subsequent report confirmed the result.','후속 보고서가 결과를 확인했다.'],
]

const WORDS = RAW_WORDS.map((w, i) => ({ id: i + 1, word: w[0], partOfSpeech: w[1], meaning: w[2], difficulty: w[3], example: w[4], translation: w[5], pronunciation: w[0] }))

const DEFAULT_STATE = {
  profile: { name: '학습자' },
  wordStatus: {},
  today: {},
  history: [],
  currentSet: 1,
}

function freshState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE))
}

function normalize(s) {
  return String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function todayProgress(state) {
  return state.today[todayKey()] || { wordIds: [], learnedCount: 0, reviewDone: false, newDone: false }
}

function getStatus(state, id) {
  return state.wordStatus[id] || { status: 'UNLEARNED', correct: 0, wrong: 0, tests: 0, reviews: 0, lastStudiedAt: null, reviewRequired: false, mastery: 0 }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...freshState(), ...JSON.parse(raw) } : freshState()
  } catch {
    return freshState()
  }
}

function stars(level) { return '★'.repeat(level) + '☆'.repeat(5 - level) }

function pickNewWords(state) {
  const used = new Set(Object.keys(state.wordStatus).filter(k => ['LEARNED', 'REVIEW', 'MASTERED'].includes(getStatus(state, k).status)).map(Number))
  const available = WORDS.filter(w => !used.has(w.id))
  if (available.length < 10) return available.slice(0, 10)
  const sorted = [...available].sort((a, b) => (a.difficulty - b.difficulty) || a.word.localeCompare(b.word))
  const selected = []
  const buckets = [sorted.filter(w => w.difficulty <= 2), sorted.filter(w => w.difficulty === 3), sorted.filter(w => w.difficulty >= 4)]
  let pointers = [0, 0, 0]
  const pattern = [0, 1, 0, 1, 2, 0, 1, 2, 1, 0]
  for (const bucketIndex of pattern) {
    const bucket = buckets[bucketIndex]
    if (pointers[bucketIndex] < bucket.length) selected.push(bucket[pointers[bucketIndex]++])
    else {
      const fallback = sorted.find(w => !selected.includes(w))
      if (fallback) selected.push(fallback)
    }
  }
  return selected.slice(0, 10)
}

function ensureToday(state) {
  const key = todayKey()
  const current = state.today[key]
  if (current) return state
  const ids = pickNewWords(state).map(w => w.id)
  const next = { ...state, today: { ...state.today, [key]: { wordIds: ids, learnedCount: 0, reviewDone: getReviewIds(state).length === 0, newDone: false, testDone: false } } }
  ids.forEach(id => {
    if (!next.wordStatus[id]) next.wordStatus[id] = { status: 'LEARNING', correct: 0, wrong: 0, tests: 0, reviews: 0, lastStudiedAt: null, reviewRequired: false, mastery: 0 }
  })
  saveState(next)
  return next
}

function getReviewIds(state) {
  return Object.entries(state.wordStatus).filter(([_, v]) => v.reviewRequired).map(([id]) => Number(id)).filter(Number.isInteger)
}

function acceptableAnswers(word) {
  return word.meaning.split(',').map(v => normalize(v)).concat([normalize(word.meaning)])
}

function isAnswerCorrect(question, answer) {
  const value = normalize(answer)
  if (question.type === 'KO_TO_EN') return value === normalize(question.word.word)
  return acceptableAnswers(question.word).includes(value)
}

function speak(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

function App() {
  const [state, setState] = useState(() => ensureToday(loadState()))
  const persist = updater => setState(prev => {
    const next = typeof updater === 'function' ? updater(prev) : updater
    saveState(next)
    return next
  })
  return <AppContext.Provider value={{ state, setState: persist }}><RoutesWithShell /></AppContext.Provider>
}

const AppContext = React.createContext(null)
const useApp = () => React.useContext(AppContext)

function RoutesWithShell() {
  return <BrowserRouter><ShellRouter /></BrowserRouter>
}

function ShellRouter() {
  const location = useLocation()
  const { state } = useApp()
  const authPaths = ['/']
  if (authPaths.includes(location.pathname)) return <Navigate to="/dashboard" replace />
  return <Shell><Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/learn/today" element={<DailyLearning />} />
    <Route path="/learn/word/:id" element={<WordDetail />} />
    <Route path="/learn/review" element={<ReviewRedirect />} />
    <Route path="/wordbooks/learning" element={<Wordbook type="learning" />} />
    <Route path="/wordbooks/learned" element={<Wordbook type="learned" />} />
    <Route path="/wordbooks/wrong" element={<Wordbook type="wrong" />} />
    <Route path="/test/:mode" element={<TestPage />} />
    <Route path="/statistics" element={<Statistics />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes></Shell>
}

function Shell({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { state, setState } = useApp()
  const items = [
    ['/dashboard', '홈'], ['/learn/today', '학습'], ['/wordbooks/learning', '단어장'], ['/wordbooks/wrong', '오답'], ['/statistics', '통계']
  ]
  return <div className="app-shell">
    <aside>
      <Link className="side-logo" to="/dashboard"><span>W</span> WordCycle</Link>
      <nav className="side-menu">{items.map(([path, label]) => <Link key={path} className={location.pathname.startsWith(path) ? 'active' : ''} to={path}>{label}</Link>)}</nav>
      <div className="side-footer">
        <div className="user-pill"><div className="avatar">{(state.profile.name || '학').slice(0,1)}</div><div><strong>{state.profile.name}</strong><small>개인 학습 모드</small></div></div>
        <button className="ghost wide" onClick={() => { if (confirm('모든 학습 데이터를 초기화할까요?')) { const next = freshState(); next.today[todayKey()] = { wordIds: [], learnedCount: 0, reviewDone: true, newDone: false, testDone: false }; setState(next); navigate('/dashboard') } }}>데이터 초기화</button>
      </div>
    </aside>
    <main>
      <header><div className="mobile-title">WordCycle</div><div className="spacer"/><div className="date-chip">{new Date().toLocaleDateString('ko-KR',{month:'short',day:'numeric',weekday:'short'})}</div></header>
      <div className="content">{children}</div>
    </main>
    <nav className="bottom-nav">{items.slice(0,5).map(([path,label]) => <Link key={path} className={location.pathname.startsWith(path) ? 'active' : ''} to={path}>{label}</Link>)}</nav>
  </div>
}

function Page({ eyebrow, title, children, action }) { return <><div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div>{action}</div>{children}</> }
function Stat({ label, value }) { return <div className="stat card"><small>{label}</small><strong>{value}</strong></div> }

function Dashboard() {
  const { state } = useApp()
  const today = todayProgress(state)
  const learned = Object.values(state.wordStatus).filter(v => ['LEARNED','REVIEW','MASTERED'].includes(v.status)).length
  const tests = state.history.reduce((a, x) => a + x.count, 0)
  const correct = state.history.reduce((a, x) => a + x.correct, 0)
  const streak = calcStreak(state)
  const reviews = getReviewIds(state)
  const todayWords = today.wordIds.length
  const doneWords = today.learnedCount
  const allDone = today.newDone && today.testDone && today.reviewDone
  return <>
    <div className="hero"><div><div className="eyebrow">WORDCYCLE · 개인 학습</div><h1>{greeting()}, {state.profile.name}.</h1><p>오늘의 신규 단어 10개와 복습 대상 단어를 차례로 정리해 보세요.</p></div><Link to={allDone ? '/test/RANDOM' : '/learn/today'} className="primary large">{allDone ? '학습 더하기' : '오늘 학습 시작'}</Link></div>
    <div className="grid three">
      <ProgressCard title="새로운 단어" done={doneWords} total={todayWords || 10} complete={today.newDone} to="/learn/today" />
      <ProgressCard title="오늘의 테스트" done={today.testDone ? 10 : 0} total={10} complete={today.testDone} to="/test/DAILY" />
      <ProgressCard title="오답 복습" done={today.reviewDone ? reviews.length : 0} total={reviews.length || 0} complete={today.reviewDone} to="/learn/review" />
    </div>
    <div className="section-head"><h2>{allDone ? '오늘의 학습 완료' : '오늘의 현황'}</h2><Link to="/settings">설정</Link></div>
    <div className="stats-grid">
      <Stat label="총 학습 단어" value={learned} />
      <Stat label="총 테스트" value={tests} />
      <Stat label="전체 정답률" value={`${tests ? Math.round(correct / tests * 100) : 0}%`} />
      <Stat label="연속 학습" value={`${streak}일`} />
    </div>
    <div className="grid two lower">
      <Link className="action-card card" to="/test/TODAY_EXTRA"><div><h3>오늘 배운 단어 반복</h3><p>오늘의 10개를 다시 학습합니다.</p></div><span>↻</span></Link>
      <Link className="action-card card" to="/test/RANDOM"><div><h3>랜덤 10문제</h3><p>학습한 단어 중 무작위로 테스트합니다.</p></div><span>→</span></Link>
    </div>
  </>
}

function ProgressCard({ title, done, total, complete, to }) { const pct = total ? Math.min(100, Math.round(done / total * 100)) : 100; return <div className="progress-card card"><div className="row"><h3>{title}</h3><span>{complete ? '완료 ✓' : `${done} / ${total}`}</span></div><div className="progress"><i style={{ width: `${pct}%` }} /></div><Link className="text-link" to={to}>{complete ? '다시 보기 →' : '계속 학습 →'}</Link></div> }

function DailyLearning() {
  const { state } = useApp()
  const today = todayProgress(state)
  if (today.newDone) return <Result title="오늘 신규 학습 완료" text="오늘의 새로운 단어 10개를 모두 학습했습니다." cta="학습 더하기" to="/test/TODAY_EXTRA" />
  const ids = today.wordIds
  const index = Math.min(today.learnedCount, ids.length)
  const word = WORDS.find(w => w.id === ids[index]) || WORDS[0]
  return <LearningCard mode="today" word={word} index={index} total={ids.length || 10} onDone={() => {}} />
}

function LearningCard({ word, index, total, onDone }) {
  const { setState } = useApp()
  const completed = () => {
    setState(prev => {
      const key = todayKey(); const t = todayProgress(prev); const nextCount = Math.min(total, t.learnedCount + 1); const done = nextCount >= total; const wordStatus = { ...prev.wordStatus, [word.id]: { ...getStatus(prev, word.id), status: done ? 'LEARNED' : 'LEARNING', lastStudiedAt: new Date().toISOString() } }; if (done) (t.wordIds || []).forEach(id => { wordStatus[id] = { ...getStatus(prev, id), ...wordStatus[id], status: 'LEARNED' } }); const next = { ...prev, today: { ...prev.today, [key]: { ...t, learnedCount: nextCount, newDone: done } }, wordStatus }; return next
    })
    onDone?.()
  }
  return <div className="learning-card card"><div className="learning-head"><span>DAY {Math.ceil((index + 1) / 10)}</span><span>{index + 1} / {total}</span></div><div className="word-core"><div className="word">{word.word}</div><div className="pos">{word.partOfSpeech}</div><button className="listen" onClick={() => speak(word.word)}>🔊 발음 듣기</button><div className="meaning">{word.meaning.split(',').map(v => <span key={v}>{v.trim()}</span>)}</div><div className="example">{word.example}<small>{word.translation}</small></div><div className="difficulty">{stars(word.difficulty)}</div></div><button className="primary large wide" onClick={completed}>{index + 1 >= total ? '학습 완료' : '다음'}</button></div>
}

function WordDetail() {
  const { id } = useParams(); const word = WORDS.find(w => w.id === Number(id)); if (!word) return <Navigate to="/wordbooks/learning" replace />
  return <Page eyebrow="WORD DETAIL" title={word.word}><div className="detail-card card"><div className="word-core"><div className="pos">{word.partOfSpeech}</div><div className="meaning">{word.meaning.split(',').map(v => <span key={v}>{v.trim()}</span>)}</div><button className="listen" onClick={() => speak(word.word)}>🔊 발음 듣기</button><div className="example">{word.example}<small>{word.translation}</small></div><div className="difficulty">난이도 {stars(word.difficulty)}</div></div><Link className="ghost" to="/wordbooks/learned">단어장으로 돌아가기</Link></div></Page>
}

function ReviewRedirect() { return <Navigate to="/test/REVIEW" replace /> }

function Wordbook({ type }) {
  const { state } = useApp(); const [q, setQ] = useState(''); const [sort, setSort] = useState('alpha')
  let arr = WORDS.map(word => ({ word, meta: getStatus(state, word.id) }))
  if (type === 'learning') arr = arr.filter(x => ['UNLEARNED','LEARNING'].includes(x.meta.status) && state.today[todayKey()]?.wordIds?.includes(x.word.id))
  if (type === 'learned') arr = arr.filter(x => ['LEARNED','REVIEW','MASTERED'].includes(x.meta.status))
  if (type === 'wrong') arr = arr.filter(x => x.meta.wrong > 0 || x.meta.reviewRequired)
  arr = arr.filter(x => x.word.word.includes(q.toLowerCase()) || x.word.meaning.includes(q))
  if (sort === 'difficulty') arr.sort((a,b) => b.word.difficulty - a.word.difficulty)
  else if (sort === 'wrong') arr.sort((a,b) => b.meta.wrong - a.meta.wrong)
  else arr.sort((a,b) => a.word.word.localeCompare(b.word.word))
  const title = type === 'learning' ? '학습중인 단어장' : type === 'learned' ? '학습한 단어장' : '오답 단어장'
  return <Page title={title} eyebrow="WORDBOOK"><div className="toolbar"><input value={q} onChange={e => setQ(e.target.value)} placeholder="단어 검색…"/><select value={sort} onChange={e => setSort(e.target.value)}><option value="alpha">알파벳순</option><option value="difficulty">난이도순</option><option value="wrong">오답 횟수순</option></select></div><div className="word-list">{arr.length ? arr.map(({word, meta}) => <Link className="word-row card" to={`/learn/word/${word.id}`} key={word.id}><div><strong>{word.word}</strong><p>{word.meaning}</p></div><div className="row-meta"><span>{stars(word.difficulty)}</span>{type === 'wrong' && <small>오답 {meta.wrong}회</small>}<span>→</span></div></Link>) : <div className="empty card">아직 표시할 단어가 없습니다.</div>}</div></Page>
}

function TestPage() {
  const { mode } = useParams(); const { state, setState } = useApp(); const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => createQuestions(state, mode)); const [index, setIndex] = useState(0); const [answer, setAnswer] = useState(''); const [finished, setFinished] = useState(false); const [result, setResult] = useState({ correct: 0, wrong: 0, wrongWords: [] });
  useEffect(() => { setQuestions(createQuestions(state, mode)); setIndex(0); setAnswer(''); setFinished(false); setResult({ correct: 0, wrong: 0, wrongWords: [] }) }, [mode])
  if (mode === 'DAILY' && !todayProgress(state).newDone) return <Result title="먼저 오늘의 단어를 학습하세요" text="새로운 단어 10개를 먼저 끝내야 오늘의 테스트를 시작할 수 있습니다." cta="오늘 학습으로" to="/learn/today" />
  if (mode === 'REVIEW' && getReviewIds(state).length === 0) return <Result title="오답 복습 완료" text="현재 복습해야 할 오답이 없습니다." cta="대시보드로" to="/dashboard" />
  const q = questions[index]
  if (!q) return <Result title="테스트 준비" text="출제할 단어가 없습니다." cta="대시보드로" to="/dashboard" />
  if (finished) return <Page eyebrow="TEST COMPLETE" title="테스트 완료"><div className="result card"><div className="check">✓</div><h2>{result.correct} / {questions.length}</h2><p>정답률 {Math.round(result.correct / Math.max(1, questions.length) * 100)}%</p>{result.wrongWords.length > 0 && <><div className="eyebrow">복습 필요 단어</div><div className="wrong-list">{result.wrongWords.map(w => <Link key={w.id} to={`/learn/word/${w.id}`}>{w.word}</Link>)}</div></>}<Link className="primary large" to={mode === 'REVIEW' ? '/dashboard' : '/dashboard'}>대시보드로</Link></div></Page>
  function submit() {
    const correct = isAnswerCorrect(q, answer); const word = q.word
    setState(prev => {
      const meta = getStatus(prev, word.id); const nextMeta = { ...meta, tests: meta.tests + 1, correct: meta.correct + (correct ? 1 : 0), wrong: meta.wrong + (correct ? 0 : 1), reviews: mode === 'REVIEW' ? meta.reviews + 1 : meta.reviews, reviewRequired: correct && mode === 'REVIEW' ? false : (meta.reviewRequired || !correct), mastery: Math.max(0, Math.min(100, meta.mastery + (correct ? 8 : -12))), status: !correct ? 'REVIEW' : (meta.status === 'REVIEW' ? 'LEARNED' : meta.status === 'UNLEARNED' ? 'LEARNING' : meta.status) , lastStudiedAt: new Date().toISOString() }
      const nextWordStatus = { ...prev.wordStatus, [word.id]: nextMeta }
      return { ...prev, wordStatus: nextWordStatus }
    })
    const nextResult = { correct: result.correct + (correct ? 1 : 0), wrong: result.wrong + (correct ? 0 : 1), wrongWords: correct ? result.wrongWords : [...result.wrongWords, word] }
    if (index + 1 >= questions.length) {
      const session = { mode, count: questions.length, correct: nextResult.correct, wrong: nextResult.wrong, startedAt: new Date().toISOString() }
      setState(prev => { const next = { ...prev, history: [...prev.history, session] }; const key = todayKey(); const t = todayProgress(next); if (mode === 'DAILY') next.today[key] = { ...t, testDone: true, reviewDone: nextResult.wrong === 0 && getReviewIds(next).length === 0 }; if (mode === 'REVIEW' && nextResult.wrong === 0) next.today[key] = { ...t, reviewDone: getReviewIds(next).length === 0 }; return next })
      setResult(nextResult); setFinished(true)
    } else { setResult(nextResult); setIndex(index + 1); setAnswer('') }
  }
  return <Page eyebrow={modeLabel(mode).toUpperCase()} title={modeLabel(mode)}><div className="test-card card"><div className="learning-head"><span>{index + 1} / {questions.length}</span><span>{q.type === 'KO_TO_EN' ? '한글 → 영어' : '영어 → 한글'}</span></div><div className="test-prompt"><div className="prompt-label">{q.type === 'KO_TO_EN' ? '다음 뜻에 해당하는 영어 단어를 입력하세요.' : '다음 단어의 뜻을 입력하세요.'}</div><div className={`prompt-big ${q.type === 'EN_TO_KO' ? 'en' : ''}`}>{q.type === 'KO_TO_EN' ? q.word.meaning : q.word.word}</div></div><form onSubmit={e => { e.preventDefault(); submit() }}><input className="answer" autoFocus value={answer} onChange={e => setAnswer(e.target.value)} placeholder="정답 입력…"/><button className="primary large wide" disabled={!answer.trim()}>제출</button></form><div className="test-note">영어는 대소문자를 무시하고, 한국어는 허용 정답을 사용합니다.</div></div></Page>
}

function createQuestions(state, mode) {
  let pool = []
  if (mode === 'REVIEW') pool = getReviewIds(state).map(id => WORDS.find(w => w.id === id)).filter(Boolean)
  else if (mode === 'DAILY') pool = (todayProgress(state).wordIds || []).map(id => WORDS.find(w => w.id === id)).filter(Boolean)
  else if (mode === 'TODAY_EXTRA') pool = (todayProgress(state).wordIds || []).map(id => WORDS.find(w => w.id === id)).filter(Boolean)
  else pool = WORDS.filter(w => ['LEARNED','REVIEW','MASTERED'].includes(getStatus(state, w.id).status))
  if (!pool.length) pool = WORDS.slice(0, Math.min(10, WORDS.length))
  const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length))
  const half = Math.ceil(selected.length / 2)
  return selected.map((word, i) => ({ word, type: i < half ? 'KO_TO_EN' : 'EN_TO_KO' })).sort(() => Math.random() - 0.5)
}

function modeLabel(m) { return ({ DAILY:'오늘의 테스트', REVIEW:'오답 복습', RANDOM:'랜덤 10문제', TODAY_EXTRA:'오늘 배운 단어', FULL_REVIEW:'전체 학습 테스트' })[m] || '테스트' }
function Result({ title, text, cta, to }) { return <Page eyebrow="COMPLETE" title={title}><div className="result card"><div className="check">✓</div><p>{text}</p><Link to={to} className="primary large">{cta}</Link></div></Page> }
function calcStreak(state) { let n = 0; const d = new Date(); for (;;) { const key = d.toISOString().slice(0,10); const v = state.today[key]; if (!v?.newDone || !v?.reviewDone) break; n++; d.setDate(d.getDate() - 1) } return n }
function greeting() { const h = new Date().getHours(); return h < 12 ? 'GOOD MORNING' : h < 18 ? 'GOOD AFTERNOON' : 'GOOD EVENING' }

function Statistics() { const { state } = useApp(); const all = Object.values(state.wordStatus); const learned = all.filter(v => ['LEARNED','REVIEW','MASTERED'].includes(v.status)).length; const tests = state.history.reduce((a,x) => a+x.count,0); const correct = state.history.reduce((a,x) => a+x.correct,0); return <Page title="학습 통계" eyebrow="STATISTICS"><div className="stats-grid"><Stat label="총 학습 단어" value={learned}/><Stat label="총 테스트" value={tests}/><Stat label="정답률" value={`${tests ? Math.round(correct / tests * 100) : 0}%`}/><Stat label="오답" value={all.reduce((a,x)=>a+x.wrong,0)}/></div><div className="card panel"><h2>학습 세션</h2>{state.history.length ? <div className="session-list">{state.history.slice().reverse().map((x,i)=><div className="session-row" key={i}><strong>{modeLabel(x.mode)}</strong><span>{x.correct} / {x.count}</span><small>{new Date(x.startedAt).toLocaleString('ko-KR')}</small></div>)}</div> : <p className="muted">아직 테스트 기록이 없습니다.</p>}</div></Page> }
function Settings() { const { state, setState } = useApp(); const [name, setName] = useState(state.profile.name); const save = () => { setState(prev => ({ ...prev, profile: { ...prev.profile, name: name.trim() || '학습자' } })); alert('저장되었습니다.'); }; return <Page title="설정" eyebrow="SETTINGS"><div className="card panel"><h2>프로필</h2><label>사용자 이름<input value={name} onChange={e => setName(e.target.value)} /></label><button className="primary" onClick={save}>저장</button></div><div className="card panel"><h2>저장 방식</h2><p className="muted">이 버전은 계정·서버·외부 데이터베이스를 사용하지 않습니다. 학습 진도와 통계는 현재 브라우저의 localStorage에 저장됩니다.</p></div><div className="card panel"><h2>백업</h2><button className="ghost" onClick={() => downloadBackup(state)}>JSON 백업 다운로드</button><button className="ghost" onClick={() => document.getElementById('restoreFile').click()}>JSON 백업 가져오기</button><input id="restoreFile" type="file" accept="application/json" hidden onChange={e => restoreBackup(e, setState)} /></div></Page> }
function downloadBackup(state) { const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `wordcycle-backup-${todayKey()}.json`; a.click(); URL.revokeObjectURL(url) }
function restoreBackup(e, setState) { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(reader.result); if (!imported.wordStatus || !imported.today) throw new Error('invalid'); setState({ ...freshState(), ...imported }); alert('백업을 불러왔습니다.') } catch { alert('올바른 WordCycle 백업 파일이 아닙니다.') } }; reader.readAsText(file) }

createRoot(document.getElementById('root')).render(<App />)
