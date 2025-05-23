import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import supabase from '@/lib/supabaseAdmin'
import jwt from 'jsonwebtoken'

function setCookie(res, name, value, options = {}) {
  let cookie = `${name}=${value}`
  if (options.httpOnly) cookie += '; HttpOnly'
  if (options.path) cookie += `; Path=${options.path}`
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`
  if (options.secure) cookie += '; Secure'
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`
  res.headers.set('Set-Cookie', cookie)
}

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Isi email dan password.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('user')
      .select('id, name, email, password')
      .eq('email', email)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, data.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Password salah.' }, { status: 401 })
    }

    // Buat JWT payload, bisa sesuaikan isinya
    const tokenPayload = { id: data.id, email: data.email, name: data.name }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    const res = NextResponse.json({ message: 'Login berhasil', user: { id: data.id, name: data.name, email: data.email } })

    setCookie(res, 'token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    return res

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
