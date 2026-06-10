import { getConversionRate, getSampleFunnel, getSampleKpis } from '@/lib/kpi'

export function KpiDashboard() {
  const kpis = getSampleKpis()
  const funnel = getSampleFunnel()
  const max = Math.max(...funnel.map((item) => item.value))

  return (
    <section className="grid">
      <div className="split">
        {kpis.map((kpi) => (
          <section className="card" key={kpi.label}>
            <p className="small muted">{kpi.label}</p>
            <div className="score">{kpi.value}</div>
            <p className="small pink">{kpi.change}</p>
          </section>
        ))}
      </div>

      <section className="card grid">
        <h2>集客ファネル</h2>
        {funnel.map((item, index) => (
          <div key={item.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>{item.label}</b>
              <span>{item.value}</span>
            </div>
            <div style={{ height: 12, borderRadius: 999, background: 'rgba(255,255,255,.08)', overflow: 'hidden', marginTop: 8 }}>
              <div style={{ height: '100%', width: `${Math.round((item.value / max) * 100)}%`, background: 'linear-gradient(135deg,#ec4899,#7c3aed)' }} />
            </div>
            {index > 0 && (
              <p className="small muted">
                前段階からのCVR: {getConversionRate(funnel[index - 1].value, item.value)}%
              </p>
            )}
          </div>
        ))}
      </section>

      <section className="card">
        <h2>改善ポイント</h2>
        <p className="muted">AI相談からLINEクリックまでの導線を強化すると予約数の増加が期待できます。</p>
      </section>
    </section>
  )
}
