import supabase from '@/lib/supabaseAdmin'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const slug = params.slug // slug = name

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('name', slug)
      .single() // gunakan single() kalau yakin hanya satu user yang cocok

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
