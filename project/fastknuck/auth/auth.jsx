"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // ambil query dari URL

  const [isRegister, setIsRegister] = useState(mode === "register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setIsRegister(mode === "register");
  }, [mode]);

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Login gagal");
        return;
      }

      const data = await res.json();
      router.push("/project/fastknuck/");
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Register gagal");
        return;
      }
      const data = await res.json();
      setIsRegister(false);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan saat register");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isRegister) {
      await handleRegister({ name, email, password });
    } else {
      await handleLogin({ email, password });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md w-80">
        <h1 className="text-xl font-semibold mb-4 text-center text-[var(--primary)]">
          {isRegister ? "Register" : "Login"}
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 text-[var(--teks-fastknuck)]">
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 rounded-xl focus:outline-[var(--primary)]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded-xl focus:outline-[var(--primary)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded-xl focus:outline-[var(--primary)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary)] text-[var(--teks)] p-2 rounded-xl hover:bg-[var(--background-fastknuck)] hover:text-[var(--primary)] border-2 border-[var(--primary)] transition"
          >
            {loading ? "Loading..." : isRegister ? "Register" : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline text-sm"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister
              ? "Sudah punya akun? Login"
              : "Belum punya akun? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
