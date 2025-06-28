'use client'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { setPreferences } from '../../../features/user/userSlice'
import { categories } from '../../../utils/categories'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

// Add your categoryIcons as before...
const categoryIcons: Record<string, React.ReactNode> = {
  Technology: <span>💻</span>,
  Sports: <span>🏆</span>,
  Finance: <span>💰</span>,
  Health: <span>🩺</span>,
  Science: <span>🔬</span>,
  Entertainment: <span>🎬</span>,
  Politics: <span>🏛️</span>,
  Business: <span>📈</span>,
  World: <span>🌎</span>,
  Travel: <span>✈️</span>,
}

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const reduxPrefs = useAppSelector(state => state.user.preferences)
  const [selected, setSelected] = useState<string[]>([])
  const [showToast, setShowToast] = useState(false)
  const [loading, setLoading] = useState(true)

  // On mount, fetch preferences from API and update Redux + local state
  useEffect(() => {
    fetch('/api/user/preferences')
      .then(res => res.json())
      .then(data => {
        setSelected(data.preferences || [])
        dispatch(setPreferences(data.preferences || []))
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  const toggleCategory = (cat: string) => {
    setSelected(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    )
  }

  const handleSave = async () => {
    const res = await fetch('/api/user/preferences', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preferences: selected }),
    })
    if (res.ok) {
      dispatch(setPreferences(selected))
      setShowToast(true)
      toast.success("Preferences saved!")
      setTimeout(() => setShowToast(false), 1500)
    } else {
      toast.error("Failed to save preferences")
    }
  }

  const handleSelectAll = () => setSelected([...categories])
  const handleClearAll = () => setSelected([])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium">Loading your preferences...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-white/20 dark:border-slate-700/30"
        >
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 sm:w-20 sm:h-20  rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 "
            >
              <span className="text-3xl sm:text-3xl">⚙️</span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2 sm:mb-3 px-2">
              Content Preferences
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
              Customize your news feed by selecting the topics that matter most to you. 
              Get personalized content tailored to your interests.
            </p>
          </div>

          {/* Stats and Controls */}
          <div className="flex flex-col gap-4 mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-600/30">
            {/* Stats Row */}
            <div className="flex items-center justify-center sm:justify-start">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{selected.length}</span>
                    <span className="text-sm ml-1">of {categories.length} selected</span>
                  </span>
                </div>
                {selected.length > 0 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(selected.length / categories.length) * 100}%` }}
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hidden sm:block"
                    style={{ maxWidth: '120px' }}
                  />
                )}
              </div>
            </div>
            
            {/* Progress bar for mobile */}
            {selected.length > 0 && (
              <div className="w-full sm:hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(selected.length / categories.length) * 100}%` }}
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            )}

            {/* Controls Row */}
            <div className="flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg sm:rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50 transition-all duration-200 font-medium text-sm shadow-sm border border-blue-200/50 dark:border-blue-700/50 min-h-[44px] flex items-center justify-center"
                onClick={handleSelectAll}
              >
                Select All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium text-sm shadow-sm border border-slate-200/50 dark:border-slate-600/50 min-h-[44px] flex items-center justify-center"
                onClick={handleClearAll}
              >
                Clear All
              </motion.button>
            </div>
          </div>

          {/* Categories Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={false}
          >
            {categories.map((cat, index) => (
              <motion.button
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                key={cat}
                className={`
                  group relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 font-medium shadow-sm transition-all duration-300 outline-none overflow-hidden min-h-[100px] sm:min-h-[120px]
                  ${selected.includes(cat)
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 dark:border-slate-600 hover:shadow-md'
                  }
                  focus:ring-4 focus:ring-blue-300/50 dark:focus:ring-blue-400/30 focus:border-blue-400
                  active:scale-95
                `}
                onClick={() => toggleCategory(cat)}
                aria-pressed={selected.includes(cat)}
                tabIndex={0}
              >
                {/* Background decoration */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  selected.includes(cat) 
                    ? 'bg-white/10' 
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                }`} />
                
                {/* Selected indicator */}
                {selected.includes(cat) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs sm:text-sm">✓</span>
                  </motion.div>
                )}
                
                <span className={`text-2xl sm:text-3xl transition-transform duration-200 ${
                  selected.includes(cat) ? 'scale-110' : 'group-hover:scale-110'
                }`}>
                  {categoryIcons[cat] || "📰"}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-center leading-tight relative z-10 px-1">
                  {cat}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-center px-4 sm:px-0">
            <motion.button
              whileHover={{ scale: selected.length === 0 ? 1 : 1.02 }}
              whileTap={{ scale: selected.length === 0 ? 1 : 0.98 }}
              onClick={handleSave}
              disabled={selected.length === 0}
              className={`
                w-full sm:w-auto px-8 py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg min-h-[52px] flex items-center justify-center
                ${selected.length === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200/50 dark:shadow-blue-900/30 hover:shadow-xl active:scale-95'
                }
              `}
            >
              <span className="truncate">
                {selected.length === 0 ? 'Select categories to continue' : `Save ${selected.length} Preference${selected.length !== 1 ? 's' : ''}`}
              </span>
            </motion.button>
          </div>

          {/* Helper Text */}
          {selected.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-500 dark:text-slate-400 mt-4 text-sm px-4"
            >
              Choose at least one category to personalize your experience
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Enhanced Toast - Made more mobile friendly */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-auto bottom-6 sm:bottom-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-4 rounded-xl sm:rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-white/20"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✅</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold">Success!</div>
              <div className="text-sm opacity-90">Your preferences have been saved</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}