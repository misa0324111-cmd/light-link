'use client'

import { useMemo, useState } from 'react'
import { createConciergeSummary, getConciergeRecommendations, initialConciergeState, updateConciergeState, type ConciergeState } from '@/lib/concierge'
import { RecommendationCard } from '@/components/RecommendationCard'

const quickOptions = ['癒されたい', '楽しく話したい', '新宿', '池袋', '2万円くらい', '本日']

export function ConciergeChat() {
  const [state, setState] = useState<ConciergeState>(initialConciergeState)
  const [input, setInput] = useState('')

  const isResult = state.stage === 'timing' || state.stage === 'result'
  const results = useMemo(() => isResult ? getConciergeRecommendations(state) : [], [state, isResult])

  function submit(text: string) {
    const value = text.trim()
    if (!value) return
    setState((prev) => updateConciergeState(prev, value))
    setInput('')
  }

  return (
    <section className="grid">
      <section className="card grid">
        <div className="badge">AI CONCIERGE</div>

        {state.messages.map((message, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div className={message.role === 'user' ? 'badge' : 'card'} style={{ maxWidth: '88%' }}>
              {message.role === 'ai' && <b className="pink">AIコンシェルジュ</b>}
              <p style={{ margin: message.role === 'ai' ? '8px 0 0' : 0 }}>{message.text}</p>
            </div>
          </div>
        ))}

        {!isResult && (
          <>
            <textarea
              className="field"
              rows={3}
              placeholder="例：癒されたい / 新宿 / 2万円くらい"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn" onClick={() => submit(input)}>送信</button>
            <div className="split">
              {quickOptions.map((option) => (
                <button className="field" key={option} onClick={() => submit(option)}>
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {isResult && (
        <>
          <section className="hero">
            <p className="badge">RESULT</p>
            <h1>AIコンシェルジュの提案</h1>
            <p className="muted">{createConciergeSummary(state)}</p>
          </section>

          {results.map((item, index) => (
            <RecommendationCard item={item} rank={index + 1} key={item.talent.id} />
          ))}

          <button className="btn btn2" onClick={() => setState(initialConciergeState)}>
            もう一度相談する
          </button>
        </>
      )}
    </section>
  )
}
