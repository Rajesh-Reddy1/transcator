import Link from "next/link";

export default function Welcome() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <section className="container px-4 py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome Back ....!
            </h1>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Manage Your Transactions and To-Dos
            </h2>
            <p className="max-w-3xl text-lg text-gray-500 dark:text-gray-400">
              Stay on top of your finances and tasks with our powerful
              Transaction Manager and To-Do Manager.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
