/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <header className="flex h-20 w-screen shrink-0 px-32">
      <nav className="flex gap-6 items-center justify-center w-full">
        <Link
          href="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-[#1E1E1E] hover:text-[#FFFAFA] focus:bg-[#1E1E1E] focus:text-[#FFFAFA] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-[#1E1E1E] hover:text-[#FFFAFA] focus:bg-[#1E1E1E] focus:text-[#FFFAFA] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          About
        </Link>
      </nav>
    </header>
  )
}