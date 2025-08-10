/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="container mx-auto py-10 text-center text-gray-600">Loading reset page...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const token = urlParams.get("token") || hashParams.get("access_token") || hashParams.get("token_hash");
      console.log("Token from query/hash on load:", token, "Full URL:", window.location.href); // Debug log
      if (!token) {
        setError("Invalid or missing reset token. Please use the link from your email.");
      }
    } catch (err) {
      console.error("Error in useEffect:", err);
      setError("An error occurred while processing the reset link.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const token = urlParams.get("token") || hashParams.get("access_token") || hashParams.get("token_hash");
      console.log("Token on submit:", token); // Debug log

      if (!newPassword.trim()) {
        setError("New password is required.");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("Invalid reset request. Please use the correct link.");
        setLoading(false);
        return;
      }

      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "recovery",
      });

      if (verifyError) {
        setError(verifyError.message);
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setMessage("Password updated successfully. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  if (error && !window.location.search.includes("token") && !window.location.hash.includes("access_token") && !window.location.hash.includes("token_hash")) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-red-500">{error}</p>
        <Link href="/forgot-password" className="mt-4 inline-block text-blue-600 hover:underline">
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}