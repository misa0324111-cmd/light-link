'use client'

import { useState } from 'react'
import { plans, type BillingPlan } from '@/lib/billing'

export function BillingPlans() {
  const [message, setMessage] = useState('')

  async function checkout(plan: BillingPlan) {
    setMessage('処理中...')
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    const json = await res.json()
    if (json?.data?.url) {
      location.href = json.data.url
      return
    }
    setMessage(json?.error ?? 'Checkoutを開始できませんでした。')
  }

  return (
    <section className="grid">
      {message && <p className="muted">{message}</p>}
      {plans.map((plan) => (
        <section className="card grid" key={plan.id}>
          <div>
            <div className="badge">{plan.name}</div>
            <h2>{plan.price}</h2>
            <p className="muted">{plan.description}</p>
          </div>
          <div className="grid">
            {plan.features.map((feature) => <p className="small" key={feature}>✓ {feature}</p>)}
          </div>
          <button className="btn" onClick={() => checkout(plan.id)}>
            {plan.id === 'free' ? '無料で開始' : 'このプランを選ぶ'}
          </button>
        </section>
      ))}
    </section>
  )
}
