import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { UserStatus } from '@/components/UserStatus'
import { NotificationBadge } from '@/components/NotificationBadge'
import { RealtimeNoticeToast } from '@/components/RealtimeNoticeToast'

const menus = [['キャスト管理','/store-admin/talents'],['予約管理','/store-admin/reservations'],['出勤管理','#'],['画像管理','/store-admin/media'],['公開準備','#'],['プラン管理','/billing'],['通知','/store-admin/notifications']]

export default function StoreAdmin(){
  return <><Header label="店舗管理"/><main className="page grid"><AuthGate allow={['store_admin','admin']}><h1>店舗管理</h1><a className="btn" href="/store/growth">集客ツール</a><a className="btn btn2" href="/store/blog">店舗ブログ</a><a className="btn btn2" href="/store/public/s1">公開ページ確認</a><a className="btn" href="/store/dashboard">SaaSダッシュボード</a><a className="btn btn2" href="/store/onboarding">公開準備ステップ</a><UserStatus /><NotificationBadge /><RealtimeNoticeToast />{menus.map(([m,h])=><Link href={h} className="card" key={m}><b>{m}</b><p className="muted small">管理機能の入口です。</p></Link>)}<Link className="btn" href="/admin">運営管理へ</Link></AuthGate></main></>
}
