export type Talent = { id:string; name:string; age:number; area:string; tags:string[]; price:number; schedule:string; profile:string; aiScore:number; storeId:string }
export type Store = { id:string; name:string; area:string; station:string; description:string }

export const stores: Store[] = [
  { id:'s1', name:'LUXE SHINJUKU', area:'新宿', station:'新宿三丁目', description:'高級感と安心感を重視した店舗です。' },
  { id:'s2', name:'GRACE IKEBUKURO', area:'池袋', station:'池袋', description:'落ち着いた雰囲気の店舗です。' },
]

export const talents: Talent[] = [
  { id:'t1', name:'れいな', age:24, area:'新宿', tags:['清楚系','癒し系','本日出勤'], price:18000, schedule:'本日 12:00-22:00', profile:'優しい雰囲気で初めての方にもおすすめです。', aiScore:96, storeId:'s1' },
  { id:'t2', name:'みお', age:27, area:'新宿', tags:['お姉さん系','会話上手'], price:26000, schedule:'本日 14:00-23:00', profile:'会話が楽しく落ち着いた時間を過ごせます。', aiScore:93, storeId:'s1' },
  { id:'t3', name:'あい', age:23, area:'池袋', tags:['可愛い系','新人'], price:16000, schedule:'明日 13:00-21:00', profile:'明るく自然体な接客が魅力です。', aiScore:88, storeId:'s2' },
]

export function getTalent(id:string){ return talents.find(t=>t.id===id) }
export function getStore(id:string){ return stores.find(s=>s.id===id) }
