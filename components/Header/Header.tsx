'use client'
import { useState, useEffect } from 'react'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sun, Moon, Search, X, User, LogOut } from 'lucide-react'
import { useSession, signOut } from "next-auth/react"
import toast from 'react-hot-toast'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { theme, setTheme, isDark } = useTheme()
  const { data: session } = useSession()

  useEffect(() => { setMounted(true) }, [])

  const handleThemeToggle = () => setTheme(isDark ? 'light' : 'dark')
  const clearSearch = () => setSearch('')

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
    toast.success("Signed out!")
  }

  // Don't render header until after client-side mount, so theme & icons match
  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Logo/Brand Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-foreground hidden sm:block">
              FeedHub
            </h1>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className={`relative group transition-all duration-300 ${
              isSearchFocused 
                ? 'transform scale-[1.02]' 
                : ''
            }`}>
              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-blue-600 z-10">
                <Search className="w-5 h-5" />
              </div>
              <Input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search news, movies, posts..."
                className="w-full pl-12 pr-12 py-3 bg-muted/50 border-border/50 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/50 transition-all duration-200 backdrop-blur-sm"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted z-10"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-opacity duration-200 pointer-events-none ${
                isSearchFocused ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          </div>

          {/* Right Section - Theme Toggle, Profile, and Sign Out */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handleThemeToggle}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="relative group rounded-xl bg-muted/50 hover:bg-muted/80 transition-all duration-300 focus:ring-2 focus:ring-blue-600/20 backdrop-blur-sm h-12 w-12"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Sun className={`absolute w-6 h-6 text-yellow-500 transition-all duration-500 ${
                  isDark 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 rotate-180 scale-75'
                }`} />
                <Moon className={`absolute w-6 h-6 text-blue-400 transition-all duration-500 ${
                  !isDark 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 -rotate-180 scale-75'
                }`} />
              </div>
            </Button>
            {/* Avatar/Profile */}
            <div className="relative group">
              <Avatar className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border shadow-md">
                User Profile
                <div className="absolute -top-1 right-3 w-2 h-2 bg-popover rotate-45 border-l border-t"></div>
              </div>
            </div>
            {/* Sign Out Button */}
            {session && (
              <Button
                onClick={handleSignOut}
                variant="destructive"
                size="icon"
                className="ml-2 rounded-xl h-12 w-12 flex items-center justify-center"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
        {/* Search Results Indicator */}
        {search && (
          <div className="mt-3 px-4 py-2 bg-blue-600/5 rounded-lg border border-blue-600/20">
            <p className="text-sm text-blue-600">
              <span className="font-medium">Searching for:</span> "{search}"
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
