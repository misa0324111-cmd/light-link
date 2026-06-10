import { NextRequest, NextResponse } from 'next/server'
import { recommend } from '@/lib/ai'
export async function POST(req: NextRequest){ const input = await req.json().catch(()=>({})); return NextResponse.json({ ok:true, data:{ recommendations: recommend(input) } }) }
