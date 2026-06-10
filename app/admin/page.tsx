import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { UserStatus } from '@/components/UserStatus'
import { NotificationBadge } from '@/components/NotificationBadge'
import { RealtimeNoticeToast } from '@/components/RealtimeNoticeToast'
const menus=['掲載審査','公開審査','通報管理','KPI分析','運用監視','本番公開準備']
export default function Admin(){
  return <><Header label="運営管理"/><main className="page grid"><AuthGate allow={['admin']}><h1>運営管理</h1><a className="btn" href="/admin/safety">安全対策</a><a className="btn btn2" href="/admin/reports">通報管理</a><a className="btn" href="/admin/operations">本番運営ダッシュボード</a><a className="btn" href="/admin/ranking">ランキング管理</a><a className="btn" href="/admin/store-applications">店舗申請管理</a><UserStatus /><a className="btn" href="/release">v3.0確認</a><NotificationBadge href="/admin/notifications" /><RealtimeNoticeToast /><a className="btn btn2" href="/admin/message-test">通知テスト</a><a className="btn btn2" href="/admin/notifications">運営通知</a><a className="btn" href="/admin/kpi">KPI分析を開く</a><a className="btn btn2" href="/admin/production">本番公開チェック</a>{menus.map(m=><section className="card" key={m}><b>{m}</b><p className="muted small">運営管理者専用の入口です。</p></section>)}</AuthGate></main></>
}
