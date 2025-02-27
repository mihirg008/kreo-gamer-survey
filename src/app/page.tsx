import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Kreo Ultimate Gamer Survey
          <span className="block text-2xl md:text-4xl mt-2">
            Are You Ready to Respawn? 🎮🔥
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Join India&apos;s first comprehensive gaming survey and help shape the future
          of gaming in our country.
        </p>

        <Link
          href="/survey"
          className="inline-block px-8 py-4 text-xl font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          Start Survey
        </Link>
      </div>
    </main>
  )
} 