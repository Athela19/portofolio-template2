import supabase from '@/lib/supabaseAdmin'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { data, error } = await supabase.from('user').select('*')
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
