'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  TrendingUp, 
  Heart, 
  Settings, 
  ChevronRight,
  BarChart3,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  { 
    name: 'Feed', 
    href: '/', 
    icon: Home,
    description: 'Your main feed'
  },
  { 
    name: 'Trending', 
    href: '/trending', 
    icon: TrendingUp,
    description: 'What\'s trending now'
  },
  { 
    name: 'Favorites', 
    href: '/favorites', 
    icon: Heart,
    description: 'Your saved items'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'Manage preferences'
  }
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle escape key to close sidebar on mobile
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when sidebar is open on mobile
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (onClose) {
      onClose()
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-label="Close sidebar"
      />

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 
        w-64 xs:w-72 sm:w-80 md:w-72 lg:w-64 xl:w-72
        h-screen bg-background border-r border-border 
        flex flex-col transition-all duration-300 ease-in-out
        lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-xl lg:shadow-none
        overflow-hidden
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-3 xs:top-4 right-3 xs:right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 xs:h-8 xs:w-8 rounded-md xs:rounded-lg hover:bg-muted/50 transition-all duration-200"
            aria-label="Close sidebar"
          >
            <X className="w-3 h-3 xs:w-4 xs:h-4" />
          </Button>
        </div>

        {/* Header */}
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2 xs:gap-3 pr-8 lg:pr-0">
            <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg xs:rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-foreground truncate">Dashboard</h2>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Control Center</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 xs:p-3 sm:p-4 space-y-1 xs:space-y-2 overflow-y-auto overscroll-contain">
          <div className="mb-3 xs:mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 xs:mb-3 px-2 xs:px-3">
              Navigation
            </h3>
            <div className="space-y-1 xs:space-y-2">
              {links.map(link => {
                const Icon = link.icon
                const isActive = pathname === link.href
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`group relative flex items-center gap-2 xs:gap-3 rounded-lg xs:rounded-xl px-2 xs:px-3 py-2 xs:py-3 sm:py-4 text-sm font-medium transition-all duration-200 hover:bg-muted/50 active:scale-[0.98] ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-foreground hover:text-foreground'
                    }`}
                  >
                    {/* Active indicator */}
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 xs:h-6 sm:h-8 bg-white rounded-r-full transition-all duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    {/* Icon */}
                    <Icon className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-all duration-200 ${
                      isActive ? 'text-white' : 'text-foreground'
                    }`} />
                    
                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium transition-colors duration-200 truncate text-sm xs:text-base ${
                        isActive ? 'text-white' : 'text-foreground'
                      }`}>
                        {link.name}
                      </div>
                      <div className={`text-xs transition-colors duration-200 truncate leading-tight ${
                        isActive ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {link.description}
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <ChevronRight className={`w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-all duration-200 ${
                      isActive 
                        ? 'text-white opacity-100' 
                        : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                    }`} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Additional Mobile Menu Items */}
          <div className="lg:hidden mt-6 xs:mt-8 pt-3 xs:pt-4 border-t border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 xs:mb-3 px-2 xs:px-3">
              Quick Actions
            </h3>
            <div className="space-y-1 xs:space-y-2">
              <button className="w-full flex items-center gap-2 xs:gap-3 rounded-lg xs:rounded-xl px-2 xs:px-3 py-2 xs:py-3 text-sm font-medium transition-all duration-200 hover:bg-muted/50 text-foreground">
                <div className="w-4 h-4 xs:w-5 xs:h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="truncate">Online Status</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 xs:p-4 border-t border-border mt-auto flex-shrink-0">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 FeedHub
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 xs:mt-1">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}