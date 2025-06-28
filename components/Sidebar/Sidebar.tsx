'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  TrendingUp, 
  Heart, 
  Settings, 
  ChevronRight,
  BarChart3
} from 'lucide-react'

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

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-64 bg-background border-r border-border flex flex-col transition-colors duration-200">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground">Control Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Navigation
          </h3>
          {links.map(link => {
            const Icon = link.icon
            const isActive = pathname === link.href
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-muted/50 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-foreground hover:text-foreground'
                }`}
              >
                {/* Active indicator */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full transition-all duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`} />
                
                {/* Icon */}
                <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-foreground'
                }`} />
                
                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className={`font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-foreground'
                  }`}>
                    {link.name}
                  </div>
                  <div className={`text-xs transition-colors duration-200 ${
                    isActive ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {link.description}
                  </div>
                </div>
                
                {/* Arrow indicator */}
                <ChevronRight className={`w-4 h-4 transition-all duration-200 ${
                  isActive 
                    ? 'text-white opacity-100' 
                    : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                }`} />
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 FeedHub
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  )
}