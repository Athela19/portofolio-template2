"use client"

import Dashboard from "@/component/Dashboard";
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/component/Layout/Loading";
import Appshell from "@/component/Appshell";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? <LoadingScreen /> : <Appshell><Dashboard />
        </Appshell>}
    </div>
  );
}
