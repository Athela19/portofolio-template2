'use client'
import { useState } from 'react'
import axios from 'axios'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'

    try {
      const res = await axios.post(endpoint, form, { withCredentials: true })
      setMessage(res.data.message || 'Success')
      if (isLogin) {
        // Redirect if needed
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Terjadi kesalahan')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
            }}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Daftar di sini' : 'Login di sini'}
          </button>
        </p>
        {message && (
          <div className="mt-4 text-center text-sm text-red-500">{message}</div>
        )}
      </div>
    </div>
  )
}
