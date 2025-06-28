'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Feed', href: '/' },
  { name: 'Trending', href: '/trending' },
  { name: 'Favorites', href: '/favorites' },
  { name: 'Settings', href: '/settings' }
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="h-screen w-60 bg-gray-900 text-white flex flex-col py-4 px-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={`rounded px-4 py-2 hover:bg-gray-800 ${pathname === link.href ? 'bg-gray-800 font-semibold' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
