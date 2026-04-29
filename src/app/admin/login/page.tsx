"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Incorrect password. Please try again.");
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            autoFocus
            className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-4 pr-12 text-sm font-medium outline-none focus:border-black focus:bg-white transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full h-12 bg-black text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-40 shadow-sm"
      >
        {loading ? "Authenticating..." : "Access Dashboard"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-12">
        
        {/* Brand */}
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">Chamie Cakes</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-1">Admin Dashboard</p>
          </div>
        </div>

        {/* Form */}
        <Suspense fallback={<div className="h-40 flex items-center justify-center text-sm text-slate-500">Loading form...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-[10px] text-slate-300 font-medium uppercase tracking-widest">
          Chamie Cakes · Admin Access Only
        </p>
      </div>
    </div>
  );
}
