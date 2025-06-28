'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import TrendingSection from '../../components/TrendingSection/TrendingSection'
import { fetchPersonalizedNews, fetchRecommendations } from '../../features/content/contentSlice'
import { tmdbGenreMap } from '../../utils/tmdbGenres'

export default function TrendingPage() {
  const dispatch = useAppDispatch()
  const preferences = useAppSelector(state => state.user.preferences)
  const news = useAppSelector(state => state.content.news)
  const recommendations = useAppSelector(state => state.content.recommendations)
  const genreIds = preferences.map(pref => tmdbGenreMap[pref]).filter(Boolean)

  // Fetch fresh news/movies if missing
  useEffect(() => {
    if (news.length === 0 && preferences.length) {
      dispatch(fetchPersonalizedNews({ categories: preferences, page: 1 }))
    }
    if (recommendations.length === 0) {
      dispatch(fetchRecommendations({ genreIds, page: 1 }))
    }
  }, [dispatch, news.length, recommendations.length, preferences, genreIds])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Trending Now
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Hottest news and movies right now, across all categories.
          </p>
        </div>

        {/* Trending News Section */}
        <TrendingSection
          title="Trending News"
          items={news}
          limit={6}
        />

        {/* Trending Movies Section */}
        <TrendingSection
          title="Trending Movies"
          items={recommendations}
          limit={6}
        />
      </div>
    </div>
  )
}
