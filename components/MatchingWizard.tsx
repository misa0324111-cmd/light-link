'use client'

import { useState } from 'react'
import Link from 'next/link'
import { matchingQuestions, runMatching, type MatchingAnswer } from '@/lib/matching'
import { saveMatchingHistory } from '@/lib/preferences'

export function MatchingWizard() {
  const [step, setStep] = useState(0)
  const [answer, setAnswer] = useState<Partial<MatchingAnswer>>({})
  const done = step >= matchingQuestions.length
  const current = matchingQuestions[step]

  function choose(key: string, value: string) {
    setAnswer({ ...answer, [key]: value })
    setStep(step + 1)
  }

  const results = done ? runMatching(answer as MatchingAnswer) : []

  if (done && results.length && typeof window !== 'undefined') {
    const key = `saved-${JSON.stringify(answer)}`
    if (!window.sessionStorage.getItem(key)) {
      saveMatchingHistory(answer, results.map((item) => item.talent.id))
      window.sessionStorage.setItem(key, '1')
    }
  }

  return (
    <section className="grid">
      {!done ? (
        <section className="card grid">
          <div className="badge">STEP {step + 1} / {matchingQuestions.length}</div>
          <h2>{current.label}</h2>
          <div className="grid">
            {current.options.map((option) => (
              <button className="field" key={option} onClick={() => choose(current.key, option)}>
                {option}
              </button>
            ))}
          </div>
          {step > 0 && <button className="btn btn2" onClick={() => setStep(step - 1)}>戻る</button>}
        </section>
      ) : (
        <>
          <section className="hero">
            <p className="badge">MATCH RESULT</p>
            <h1>AI相性診断結果</h1>
            <p className="muted">あなたの希望条件から相性スコアを算出しました。</p>
          </section>

          {results.map((result, index) => (
            <section className="card grid" key={result.talent.id}>
              <div className="small muted">マッチ度 {index + 1}位</div>
              <div className="talent">
                <div className="avatar">{result.talent.name[0]}</div>
                <div>
                  <h2>{result.talent.name}</h2>
                  <div className="score">{result.score}%</div>
                </div>
              </div>
              <div className="grid">
                {result.reasons.map((reason) => <p className="small" key={reason}>✓ {reason}</p>)}
              </div>
              <div className="split">
                <Link className="btn" href={`/talents/${result.talent.id}`}>詳細</Link>
                <Link className="btn btn2" href={`/reservation/new?talent=${result.talent.id}`}>予約</Link>
              </div>
            </section>
          ))}

          <button className="btn btn2" onClick={() => { setStep(0); setAnswer({}) }}>もう一度診断する</button>
        </>
      )}
    </section>
  )
}
