'use client'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setPreferences } from '../../features/user/userSlice'
import { categories } from '../../utils/categories'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'



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

// ---- Main component ----
export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const savedPrefs = useAppSelector(state => state.user.preferences)
  const [selected, setSelected] = useState<string[]>(savedPrefs || [])
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setSelected(savedPrefs)
  }, [savedPrefs])

  const toggleCategory = (cat: string) => {
    setSelected(selected =>
      selected.includes(cat)
        ? selected.filter(c => c !== cat)
        : [...selected, cat]
    )
  }

  const handleSave = () => {
    dispatch(setPreferences(selected))
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1500)
  }

  const handleSelectAll = () => setSelected([...categories])
  const handleClearAll = () => setSelected([])

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <h2 className="text-lg font-semibold mb-4">Choose Your Content Categories:</h2>
      <div className="flex items-center mb-6 gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          <strong>{selected.length}</strong> selected
        </span>
        <button
          type="button"
          className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition"
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          type="button"
          className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      <motion.div
        layout
        className="flex flex-wrap gap-3 mb-8"
        initial={false}
      >
        {categories.map(cat => (
          <motion.button
            layout
            whileTap={{ scale: 0.92 }}
            whileHover={{
              scale: 1.08,
              boxShadow: selected.includes(cat)
                ? "0 2px 16px 0 #3b82f6cc"
                : "0 2px 10px 0 #e0e7ef",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            key={cat}
            className={`
              flex items-center gap-2 px-5 py-2 rounded-full border font-medium shadow-sm transition-all outline-none
              ${selected.includes(cat)
                ? 'bg-blue-600 text-white border-blue-600 shadow-blue-100'
                : 'bg-white text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-100'}
              focus:ring-2 focus:ring-blue-300
            `}
            onClick={() => toggleCategory(cat)}
            aria-pressed={selected.includes(cat)}
            tabIndex={0}
          >
            <span className="text-lg">{categoryIcons[cat] || "📰"}</span>
            {cat}
          </motion.button>
        ))}
      </motion.div>
      <button
        onClick={handleSave}
        disabled={selected.length === 0}
        className="px-6 py-2 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition disabled:opacity-60"
      >
        Save Preferences
      </button>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <span>✅ Preferences saved!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
