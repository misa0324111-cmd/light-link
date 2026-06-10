'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createAiReply } from '@/lib/ai-chat'
import { saveChatHistory } from '@/lib/chat-history'

type Message = {
  role: 'ai' | 'user'
  text: string
}

type AiResult = ReturnType<typeof createAiReply>

export function AiChatBox() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'こんにちは。希望のタイプ、エリア、予算、利用タイミングを自由に入力してください。例：今日、新宿で優しい人、予算2万円くらい。' },
  ])
  const [result, setResult] = useState<AiResult | null>(null)
  const [mode, setMode] = useState<'rule' | 'openai'>('rule')
  const [loading, setLoading] = useState(false)

  async function analyze(text: string) {
    const fallback = createAiReply(text)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      const json = await res.json()
      if (json?.ok && json?.data) {
        setMode(json.mode === 'openai' ? 'openai' : 'rule')
        return json.data as AiResult
      }
    } catch {
      // fallback
    }

    setMode('rule')
    return fallback
  }

  async function submitText(text: string) {
    const value = text.trim()
    if (!value) return
    setLoading(true)
    setMessages((prev) => [...prev, { role: 'user', text: value }])

    const ai = await analyze(value)
    setResult(ai)
    setMessages((prev) => [...prev, { role: 'ai', text: ai.reply }])
    setInput('')
    setLoading(false)

    await saveChatHistory({
      userText: value,
      aiReply: ai.reply,
      extracted: ai.parsed.extracted,
      recommendations: ai.recommendations.map((item) => item.talent.name),
    })
  }

  return (
    <section className="grid">
      <div className="card grid">
        <div className="badge">{mode === 'openai' ? 'GPT解析モード' : 'ルール解析モード'}</div>

        {messages.map((message, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div className={message.role === 'user' ? 'badge' : 'card'} style={{ maxWidth: '88%' }}>
              {message.role === 'ai' && <b className="pink">AIコンシェルジュ</b>}
              <p style={{ margin: message.role === 'ai' ? '8px 0 0' : 0 }}>{message.text}</p>
            </div>
          </div>
        ))}

        <textarea
          className="field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例：今日、新宿で優しい人、予算2万円くらい"
          rows={3}
        />
        <button className="btn" onClick={() => submitText(input)} disabled={loading}>
          {loading ? '解析中...' : 'AIに相談する'}
        </button>

        <div className="split">
          <button className="field" onClick={() => submitText('今日、新宿で優しい人、予算2万円くらい')}>本日・新宿</button>
          <button className="field" onClick={() => submitText('池袋で可愛い系、明日、安めで探したい')}>池袋・明日</button>
        </div>
      </div>

      {result && (
        <section className="card grid">
          <div>
            <div className="badge">解析信頼度 {result.parsed.confidence}%</div>
            <h2>読み取った希望</h2>
            {result.parsed.extracted.length ? (
              <ul className="muted">
                {result.parsed.extracted.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p className="muted">条件が少ないため、追加で希望を入力してください。</p>
            )}
          </div>

          <h2>AIおすすめ候補</h2>
          {result.recommendations.map((rec, index) => (
            <article className="card" key={rec.talent.id}>
              <div className="small muted">AIおすすめ {index + 1}位</div>
              <h3>{rec.talent.name}</h3>
              <div className="score">{rec.score}%</div>
              <p className="small muted">{rec.reasons.join(' / ') || '総合評価が高い候補です'}</p>
              <div className="split">
                <Link className="btn" href={`/talents/${rec.talent.id}`}>詳細</Link>
                <Link className="btn btn2" href={`/reservation/new?talent=${rec.talent.id}`}>予約</Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  )
}
