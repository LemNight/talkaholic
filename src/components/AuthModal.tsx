export default function AuthModal() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
        <h2 id="auth-modal-title" className="text-xl font-semibold mb-2">Authentication</h2>
        <p className="text-gray-600">Auth modal coming in the next stage. Stay tuned!</p>
      </div>
    </div>
  );
}
