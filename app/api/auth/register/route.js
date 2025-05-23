import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import supabase from '@/lib/supabaseAdmin'

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nama, email, dan password harus diisi.' },
        { status: 400 }
      )
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid.' },
        { status: 400 }
      )
    }

    // Validasi kekuatan password
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password harus minimal 6 karakter.' },
        { status: 400 }
      )
    }

    // Cek apakah user sudah ada
    const { data: existingUser, error: lookupError } = await supabase
      .from('user')
      .select('email')
      .eq('email', email)
      .maybeSingle() // Menggunakan maybeSingle() daripada single()

    if (lookupError) {
      throw lookupError
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar.' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Buat user baru
    const { data: newUser, error: createError } = await supabase
      .from('user')
      .insert([{ 
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword 
      }])
      .select('id, name, email, created_at')
      .single()

    if (createError) {
      throw createError
    }

    // Return response tanpa data sensitif
    return NextResponse.json(
      { 
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.created_at
        } 
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error registrasi:', err)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi.' },
      { status: 500 }
    )
  }
}