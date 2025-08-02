import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl">Talkaholic</div>
        <ul className="flex space-x-4">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/trivia">Trivia</Link></li>
          <li><button onClick={() => alert("Login coming soon!")}>Login</button></li>
          <li><button onClick={() => alert("Sign up coming soon!")}>Create Account</button></li>
        </ul>
      </nav>
    </header>
  );
}