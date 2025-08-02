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

  const commonLinks = (
    <>
      <li><Link href="/about">About</Link></li>
      <li><Link href="/events">Events</Link></li>
      <li><Link href="/trivia">Trivia</Link></li>
    </>
  );

  return (
    <header className="bg-black text-white py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">
          <Link href="/">Talkaholic</Link>
        </div>
        <ul className="flex flex-wrap items-center gap-4 text-sm">
          {commonLinks}
          {!loading && (
            session ? (
              <>
                <li><Link href="/profile">Profile</Link></li>
                <li>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setSession(null);
                    }}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link href="/login">Login</Link></li>
                <li>
                  <Link
                    href="/signup"
                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
                  >
                    Create Account
                  </Link>
                </li>
              </>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}
