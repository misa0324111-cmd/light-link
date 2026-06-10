import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { getReadinessScore, getServerEnvChecks } from '@/lib/env-check'

export default function ProductionPage() {
  const checks = getServerEnvChecks()
  const score = getReadinessScore(checks)

  return (
    <>
      <Header label="公開準備" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <section className="hero">
            <p className="badge">PRODUCTION</p>
            <h1>本番公開チェック</h1>
            <p className="muted">環境変数と外部サービス設定の準備状況を確認します。</p>
            <div className="score">{score}%</div>
          </section>

          <section className="card grid">
            <h2>環境変数</h2>
            {checks.map((check) => (
              <div className="card" key={check.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <b>{check.label}</b>
                  <span className={check.configured ? 'pink' : 'muted'}>{check.configured ? 'OK' : '未設定'}</span>
                </div>
                <p className="small muted">{check.key}</p>
                <p className="small">用途: {check.requiredFor}</p>
              </div>
            ))}
          </section>
        </AuthGate>
      </main>
    </>
  )
}
