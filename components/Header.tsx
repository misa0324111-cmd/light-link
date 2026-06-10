import Link from 'next/link'
export function Header({ label='AIコンシェルジュ' }: { label?: string }) {
  return <header className="header"><div className="header-inner"><Link href="/welcome" className="brand">LIGHT <span className="pink">LINK</span></Link><span className="badge">{label}</span></div></header>
}
