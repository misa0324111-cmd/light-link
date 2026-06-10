import Link from 'next/link'
import { Header } from '@/components/Header'
import { getStore, getTalent } from '@/lib/data'
import { LineCta } from '@/components/LineCta'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ViewTracker } from '@/components/ViewTracker'
import { JsonLd } from '@/components/JsonLd'
import { getJsonLdTalent } from '@/lib/seo'
export default function TalentPage({ params }: { params:{id:string} }) {
  const talent=getTalent(params.id)
  if(!talent) return <main className="page">Not found</main>
  const store=getStore(talent.storeId)
  return <><JsonLd data={getJsonLdTalent(talent.id)} /><Header label="詳細"/><ViewTracker talentId={talent.id} /><main className="page grid"><section className="hero"><div className="avatar" style={{width:120,height:120,fontSize:42}}>{talent.name[0]}</div><h1>{talent.name}</h1><div className="score">AI {talent.aiScore}%</div><p className="muted">{talent.profile}</p></section><section className="card"><h2>プロフィール</h2><p>{talent.age}歳 / {talent.area}</p><p>{talent.tags.join(' / ')}</p><p className="muted">店舗: {store?.name}</p></section><div className="split"><Link className="btn" href={`/reservation/new?talent=${talent.id}`}>WEB予約</Link><LineCta label="LINE相談" source="talent_detail" /><FavoriteButton talentId={talent.id} /><a className="btn btn2" href="/report">通報</a></div></main></>
}
