'use client'
import { useState, useEffect } from 'react'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sun, Moon, Search, X, User, LogOut, Menu } from 'lucide-react'
import { useSession, signOut } from "next-auth/react"
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSearch } from '@/features/user/userSlice'

interface HeaderProps {
  onMenuToggle?: () => void
  isSidebarOpen?: boolean
}

export default function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const { theme, setTheme, isDark } = useTheme()
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.user.search)

  useEffect(() => { setMounted(true) }, [])

  const handleThemeToggle = () => setTheme(isDark ? 'light' : 'dark')
  const clearSearch = () => dispatch(setSearch(''))

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
    toast.success("Signed out!")
  }

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (!isSearchExpanded) {
      // Focus search input after animation
      setTimeout(() => {
        const searchInput = document.querySelector('#mobile-search') as HTMLInputElement
        searchInput?.focus()
      }, 150)
    }
  }

  // Don't render header until after client-side mount, so theme & icons match
  if (!mounted) return null

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4">
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="lg:hidden flex-shrink-0 h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 rounded-lg xs:rounded-xl hover:bg-muted/50 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <Menu className="w-4 h-4 xs:w-5 xs:h-5" />
            </Button>

            {/* Logo/Brand Section */}
            <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 flex-shrink-0 min-w-0">
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md xs:rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                </svg>
              </div>
              <h1 className="text-base xs:text-lg sm:text-xl font-bold text-foreground hidden xxs:block truncate">
                FeedHub
              </h1>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-lg lg:max-w-2xl mx-auto">
              <div className={`relative group transition-all duration-300 ${
                isSearchFocused ? 'transform scale-[1.02]' : ''
              }`}>
                <div className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-blue-600 z-10">
                  <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <Input
                  type="text"
                  value={search}
                  onChange={e => dispatch(setSearch(e.target.value))}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search news, movies, posts..."
                  className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-2 lg:py-3 bg-muted/50 border-border/50 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/50 transition-all duration-200 backdrop-blur-sm text-sm lg:text-base"
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 lg:right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 lg:h-8 lg:w-8 p-0 hover:bg-muted z-10"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                )}
                <div className={`absolute inset-0 rounded-lg lg:rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-opacity duration-200 pointer-events-none ${
                  isSearchFocused ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            </div>

            {/* Right Section - Mobile Search, Theme Toggle, Profile, and Sign Out */}
            <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 flex-shrink-0 ml-auto">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="md:hidden h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 rounded-lg xs:rounded-xl hover:bg-muted/50 transition-all duration-200"
                aria-label="Toggle search"
              >
                <Search className="w-4 h-4 xs:w-5 xs:h-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleThemeToggle}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative group rounded-lg xs:rounded-xl bg-muted/50 hover:bg-muted/80 transition-all duration-300 focus:ring-2 focus:ring-blue-600/20 backdrop-blur-sm h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 border-border/50"
              >
                <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <Sun className={`absolute w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-yellow-500 transition-all duration-500 ${
                    isDark
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 rotate-180 scale-75'
                  }`} />
                  <Moon className={`absolute w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-blue-400 transition-all duration-500 ${
                    !isDark
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-180 scale-75'
                  }`} />
                </div>
              </Button>

              {/* Avatar/Profile */}
              <div className="relative group">
                <Avatar className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <User className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute right-0 top-full mt-2 px-2 xs:px-3 py-1 bg-popover text-popover-foreground text-xs xs:text-sm rounded-md xs:rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border shadow-md z-50">
                  User Profile
                  <div className="absolute -top-1 right-2 xs:right-3 w-2 h-2 bg-popover rotate-45 border-l border-t"></div>
                </div>
              </div>

              {/* Sign Out Button */}
              {session && (
                <Button
                  onClick={handleSignOut}
                  variant="destructive"
                  size="icon"
                  className="rounded-lg cursor-pointer xs:rounded-xl h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center transition-all duration-200"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Search Results Indicator */}
          {search && (
            <div className="hidden md:block mt-3 px-3 lg:px-4 py-2 bg-blue-600/5 rounded-lg border border-blue-600/20">
              <p className="text-sm text-blue-600">
                <span className="font-medium">Searching for:</span> {search}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 transform ${
        isSearchExpanded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 py-3 xs:py-4">
          <div className="flex items-center gap-2 xs:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 rounded-lg xs:rounded-xl hover:bg-muted/50 flex-shrink-0 transition-all duration-200"
              aria-label="Close search"
            >
              <X className="w-4 h-4 xs:w-5 xs:h-5" />
            </Button>
            <div className="relative flex-1 min-w-0">
              <div className="absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
                <Search className="w-4 h-4 xs:w-5 xs:h-5" />
              </div>
              <Input
                id="mobile-search"
                type="text"
                value={search}
                onChange={e => dispatch(setSearch(e.target.value))}
                placeholder="Search news, movies, posts..."
                className="w-full pl-8 xs:pl-10 sm:pl-11 pr-8 xs:pr-10 sm:pr-11 py-2 xs:py-3 bg-muted/50 border-border/50 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/50 transition-all duration-200 text-sm xs:text-base"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 xs:right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 p-0 hover:bg-muted z-10"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3 xs:w-4 xs:h-4" />
                </Button>
              )}
            </div>
          </div>
          {/* Mobile Search Results Indicator */}
          {search && (
            <div className="mt-3 px-3 xs:px-4 py-2 bg-blue-600/5 rounded-lg border border-blue-600/20">
              <p className="text-xs xs:text-sm text-blue-600">
                <span className="font-medium">Searching for:</span> {search}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}