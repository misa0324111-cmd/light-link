import { getLaunchChecklist, getOperationChecks, getOperationScore } from '@/lib/operations'

export function OperationsDashboard() {
  const checks = getOperationChecks()
  const score = getOperationScore()
  const list = getLaunchChecklist()

  return (
    <section className="grid">
      <section className="hero">
        <p className="badge">OPERATIONS</p>
        <h1>本番運営ダッシュボード</h1>
        <p className="muted">必須設定 {score.requiredScore}% / 全体設定 {score.allScore}%</p>
        <div className="score">{score.requiredScore}%</div>
      </section>

      <section className="card grid">
        <h2>接続設定</h2>
        {checks.map((check) => (
          <section className="card" key={check.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <b>{check.label}</b>
              <span className={check.configured ? 'pink' : 'muted'}>
                {check.configured ? 'OK' : check.required ? '必須' : '任意'}
              </span>
            </div>
            <p className="small muted">{check.group} / {check.key}</p>
          </section>
        ))}
      </section>

      <section className="card grid">
        <h2>公開チェックリスト</h2>
        {list.map((item, index) => (
          <p className="small" key={item}>□ STEP {index + 1}: {item}</p>
        ))}
      </section>
    </section>
  )
}
