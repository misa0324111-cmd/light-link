import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const area = searchParams.get('area') || '新宿'
  const keyword = searchParams.get('keyword') || ''

  const q = `${area} ${keyword} 風俗 店舗情報`
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`
  const cityHeavenUrl = `https://www.google.com/search?q=${encodeURIComponent(`site:cityheaven.net ${q}`)}`

  return NextResponse.json({
    ok: true,
    area,
    keyword,
    links: [
      { title: 'Googleで店舗情報を検索', url: googleUrl },
      { title: 'シティヘブン系で検索', url: cityHeavenUrl },
    ],
  })
}
