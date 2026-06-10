import Link from 'next/link'
export function BottomNav() {
  const items=[['⌂','ホーム','/welcome'],['🔍','検索','/search'],['💬','AI','/concierge'],['♡','好み','/preferences'],['👤','管理','/store-admin']]
  return <nav className="nav"><div className="nav-inner">{items.map(([i,l,h])=><Link key={h} href={h}><div>{i}</div><div>{l}</div></Link>)}</div></nav>
}
