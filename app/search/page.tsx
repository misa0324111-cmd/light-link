import Link from 'next/link'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { talents } from '@/lib/data'
export default function Search(){return <><Header label="検索"/><main className="page grid"><h1>検索</h1>{talents.map(t=><Link className="card talent" href={`/talents/${t.id}`} key={t.id}><div className="avatar">{t.name[0]}</div><div><b>{t.name}</b><div className="small muted">{t.area} / ¥{t.price.toLocaleString()}</div><div className="small">{t.tags.join(' / ')}</div></div></Link>)}</main><BottomNav/></>}
