"use client"

import dynamic from "next/dynamic";

// Import AuthPage secara dinamis agar tidak dijalankan saat SSR
const AuthPage = dynamic(() => import("@/project/fastknuck/auth/auth"), {
  ssr: false, // <== ini penting
});

export default function Auth() {
    return <AuthPage />;
}
