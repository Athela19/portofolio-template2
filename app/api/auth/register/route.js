import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import supabase from '@/lib/supabaseAdmin'

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Isi dengan benar.' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from('user')  // sesuaikan nama tabel kamu
      .insert([{ name, email, password: hashedPassword }])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Gagal menyimpan user' }, { status: 500 })
    }

    const user = { id: data[0].id, name: data[0].name, email: data[0].email }

    return NextResponse.json({ user }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
