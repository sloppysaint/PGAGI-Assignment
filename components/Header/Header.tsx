'use client'

import { useState } from 'react'

export default function Header() {
  // We'll connect search later!
  const [search, setSearch] = useState('')

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 border-b">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search news, movies, posts..."
        className="flex-1 mr-4 px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
      />
      <div className="flex gap-4 items-center">
        {/* Dark mode toggle and user icon coming later */}
        <button title="Toggle Dark Mode">🌙</button>
        <div className="rounded-full bg-gray-400 w-8 h-8"></div>
      </div>
    </header>
  )
}
