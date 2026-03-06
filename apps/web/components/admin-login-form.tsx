"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="panel mx-auto w-full max-w-md space-y-4 p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || "Senha inválida.");
          setLoading(false);
          return;
        }
        window.location.href = "/admin";
      }}
    >
      <h1 className="text-xl font-semibold">Admin JHONROB</h1>
      <p className="text-sm text-muted">Login simples para demonstração (senha em variável de ambiente).</p>
      <label className="block space-y-2">
        <span className="text-sm text-muted">Senha</span>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <Button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </form>
  );
}
