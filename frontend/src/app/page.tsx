"use client";
import { setToken } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setToken(data.access_token);
      router.push("/weather");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <main className="flex flex-col bg-[#ffffff] items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold  absolute bottom-3 right-4">OpenWeather</h1>
      <h2 className="text-3xl font-bold mb-6">Iniciar sesión</h2>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="cursor-pointer hover:bg-blue-400 bg-blue-600 text-white py-2 rounded">
          Entrar
        </button>
      </form>
    </main>
  );
}
