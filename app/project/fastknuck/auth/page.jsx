// app/project/fastknuck/auth/page.jsx
import { Suspense } from "react";
import AuthPage from "@/project/fastknuck/auth/auth";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}

