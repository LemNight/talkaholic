export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Talkaholic. All rights reserved.
        </p>
        <div className="mt-3 sm:mt-0 flex space-x-4 text-sm">
          <a href="/about" className="hover:underline text-gray-400">About</a>
          <a href="/contact" className="hover:underline text-gray-400">Contact</a>
          <a href="/privacy" className="hover:underline text-gray-400">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
