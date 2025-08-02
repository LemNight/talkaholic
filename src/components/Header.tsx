"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <header className="bg-black text-white py-4">
        <nav className="container mx-auto flex justify-between">
          <div className="text-xl">Talkaholic</div>
          <ul className="flex space-x-4">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/trivia">Trivia</Link></li>
          </ul>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-black text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl">Talkaholic</div>
        <ul className="flex space-x-4">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/trivia">Trivia</Link></li>
          {session ? (
            <>
              <li><Link href="/profile">Profile</Link></li>
              <li>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setSession(null);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/signup">Create Account</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}