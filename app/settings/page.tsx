'use client'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setPreferences } from '../../features/user/userSlice'
import { categories } from '../../utils/categories'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const savedPrefs = useAppSelector(state => state.user.preferences)
  const [selected, setSelected] = useState<string[]>(savedPrefs || [])

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
    // Optionally: toast message "Preferences saved!"
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <h2 className="text-lg font-semibold mb-2">Choose Your Content Categories:</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded border 
              ${selected.includes(cat)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300'}
            `}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        Save Preferences
      </button>
    </div>
  )
}
