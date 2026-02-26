'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type ApiErrorPayload =
  | { code?: string; message?: string; error?: string }
  | Record<string, unknown>;

function mapAuthError(payload: ApiErrorPayload): string {
  const code = typeof payload.code === "string" ? payload.code : undefined;
  const message = typeof payload.message === "string" ? payload.message : undefined;
  const error = typeof payload.error === "string" ? payload.error : undefined;

  // Preferred: stable codes from the backend
  if (code) {
    switch (code) {
      case "MISSING_EMAIL":
        return "Please enter your email.";
      case "MISSING_PASSWORD":
        return "Please enter your password.";
      case "INVALID_CREDENTIALS":
        return "Invalid email or password. Try again.";
      case "INVALID_JSON":
        return "Something went wrong with the request. Try again.";
      case "AUTH_FAILED":
        return "Login failed. Try again.";
      default:
        return message ?? "Login failed. Try again.";
    }
  }

  // Back-compat: your current backend returns { error: "..." }
  if (error) {
    const normalized = error.toLowerCase().trim();

    if (normalized.includes("missing email")) return "Please enter your email.";
    if (normalized.includes("missing password")) return "Please enter your password.";
    if (normalized.includes("invalid json")) return "Something went wrong with the request. Try again.";
    if (normalized.includes("invalid cred")) return "Invalid email or password. Try again.";
    if (normalized.includes("failed to authenticate")) return "Login failed. Try again.";

    // If you want to show raw server text, return error instead.
    return "Login failed. Try again.";
  }

  return "Login failed. Try again.";
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // trimming is okay for email; don't trim password
    setEmail(e.target.value.trim());
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      // Optional pre-check: immediate UI feedback before hitting the server
      if (!email) {
        setErrorMsg("Please enter your email.");
        return;
      }
      if (!password) {
        setErrorMsg("Please enter your password.");
        return;
      }

      // 1) Call your validate route (kept because you already have it)
      const res = await fetch("/api/auth/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload: ApiErrorPayload = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(mapAuthError(payload));
        return;
      }

      // 2) Then create a NextAuth session
      const session = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // next-auth returns errors as strings; map them to a safe message
      if (session?.error) {
        setErrorMsg("Invalid email or password. Try again.");
        return;
      }

      router.push("/");
    } catch (err) {
      setErrorMsg("Unable to reach the server. Try again.");
      console.error("Failed to log in:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex-col items-center flex-grow">
      <h1 className="text-center font-bold text-xl text-black text-center mt-20 mb-5 underline">
        Login
      </h1>

      <form
        className="space-y-2 border-2 border-black-900 rounded bg-white p-10 w-full max-w-md mx-auto text-black"
        onSubmit={submitAction}
      >
        <div id="email" className="ml-[-8%]">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            name="email"
            className="border border-black-300 rounded p-1 ml-[2%] w-full"
            placeholder="Example@gmail.com"
            onChange={emailChange}
            required
            aria-invalid={!!errorMsg}
          />
        </div>

        <div id="password" className="ml-[-8%]">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            name="password"
            className="border rounded p-1 ml-[2%] w-full"
            placeholder="Enter password"
            onChange={passwordChange}
            required
            aria-invalid={!!errorMsg}
          />
        </div>

        {/* Custom error message block */}
        {errorMsg && (
          <div className="text-red-600 text-sm font-medium mt-2">
            {errorMsg}
          </div>
        )}

        <div id="log-button">
          <button
            className="w-full border border-black-400 rounded text-sm py-2 font-semibold transition cursor-pointer hover:bg-purple-900 mt-2"
            disabled={loading}
            type="submit"
          >
            {loading ? "Checking..." : "Submit"}
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <Link
            id="reg-link"
            href="./register"
            className="text-cyan-300 underline cursor-pointer text-sm hover:text-blue-700"
          >
            Make an account
          </Link>

          <Link
            id="forgotten-pwd"
            href="/"
            className="text-cyan-300 underline cursor-pointer text-sm hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}