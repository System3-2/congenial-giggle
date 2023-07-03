import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-black text-black dark:text-white">
      <section className="w-full md:w-1/2 flex justify-center items-center gap-3 m-3 p-3 border border-black dark:border-white">
        <div className="w-full flex flex-col gap-3 ">
          <div className="w-full flex justify-between items-center gap-3">
            <h1 className="text-lg md:text-xl lg:text-2xl text-start">Login</h1>
            <Link href={'/signup'} className="text-sm lg:text-lg text-blue-900">
              Create an account
            </Link>
          </div>
          <form></form>
        </div>
      </section>
    </main>
  );
}
