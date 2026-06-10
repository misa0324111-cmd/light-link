'use client'

import { useState } from 'react'
import { createAiPromoText } from '@/lib/growth'

export function PromoTextGenerator() {
  const [result, setResult] = useState<{ lp: string; sns: string; seo: string } | null>(null)

  function generate(formData: FormData) {
    setResult(createAiPromoText({
      storeName: String(formData.get('storeName') ?? ''),
      area: String(formData.get('area') ?? ''),
      mood: String(formData.get('mood') ?? ''),
      strength: String(formData.get('strength') ?? ''),
    }))
  }

  return (
    <section className="grid">
      <form action={generate} className="card grid">
        <h2>AI紹介文生成</h2>
        <input className="field" name="storeName" placeholder="店舗名" />
        <input className="field" name="area" placeholder="エリア" />
        <input className="field" name="mood" placeholder="雰囲気 例：癒し系" />
        <input className="field" name="strength" placeholder="強み 例：初回でも安心" />
        <button className="btn">紹介文を生成</button>
      </form>

      {result && (
        <section className="card grid">
          <h2>生成結果</h2>
          <b>LP文章</b>
          <p className="muted">{result.lp}</p>
          <b>SNS投稿</b>
          <p className="muted">{result.sns}</p>
          <b>SEO文章</b>
          <p className="muted">{result.seo}</p>
        </section>
      )}
    </section>
  )
}
