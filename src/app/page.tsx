export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to <span className="text-blue-600">Notely</span>
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Create, organize, and manage your notes effortlessly.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/notes"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-100"
            >
              Login
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}