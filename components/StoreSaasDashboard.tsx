import Link from 'next/link'
import { getSaasDashboardKpis, onboardingSteps } from '@/lib/saas'

export function StoreSaasDashboard() {
  const kpis = getSaasDashboardKpis()

  return (
    <section className="grid">
      <div className="split">
        {kpis.map((item) => (
          <section className="card" key={item.label}>
            <p className="small muted">{item.label}</p>
            <div className="score">{item.value}</div>
            <p className="small pink">{item.note}</p>
          </section>
        ))}
      </div>

      <section className="card grid">
        <h2>公開までのステップ</h2>
        {onboardingSteps.map((step, index) => (
          <Link className="card" href={step.href} key={step.title}>
            <div className="badge">STEP {index + 1}</div>
            <b>{step.title}</b>
            <p className="small muted">{step.text}</p>
          </Link>
        ))}
      </section>
    </section>
  )
}
