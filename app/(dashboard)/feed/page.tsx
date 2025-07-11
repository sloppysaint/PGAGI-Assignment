'use client'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  fetchPersonalizedNews,
  incrementPage,
  resetNews,
  fetchRecommendations
} from '../../../features/content/contentSlice'
import Spinner from '../../../components/Spinner/Spinner'
import ReorderableFeed from '../../../components/ReorderableFeed/ReorderableFeed'
import { tmdbGenreMap } from '../../../utils/tmdbGenres'

export default function FeedPage() {
  const dispatch = useAppDispatch()
  const preferences = useAppSelector(state => state.user.preferences)
  const { news, loading, page, hasMore, error, recommendations } = useAppSelector(state => state.content)
  const search = useAppSelector(state => state.user.search)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Map user preferences to TMDB genre IDs
  const genreIds = preferences.map(pref => tmdbGenreMap[pref]).filter(Boolean)

  useEffect(() => {
    dispatch(resetNews())
    if (preferences.length) {
      dispatch(fetchPersonalizedNews({ categories: preferences, page: 1 }))
    }
    dispatch(fetchRecommendations({ genreIds, page: 1 }))
    // eslint-disable-next-line
  }, [preferences.join(','), dispatch])

  // Handler to load more news (pagination)
  const loadMore = async () => {
    setIsLoadingMore(true)
    dispatch(incrementPage())
    await dispatch(fetchPersonalizedNews({ categories: preferences, page: page + 1 }))
    setIsLoadingMore(false)
  }

  // ------- Search Filtering -------
  const filterBySearch = (items: any[]) => {
    if (!search.trim()) return items
    const s = search.toLowerCase()
    return items.filter(
      (item) =>
        item.title?.toLowerCase().includes(s) ||
        item.name?.toLowerCase().includes(s) ||
        item.description?.toLowerCase().includes(s) ||
        item.overview?.toLowerCase().includes(s)
    )
  }
  const filteredNews = filterBySearch(news)
  const filteredMovies = filterBySearch(recommendations)
  // ---------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-[98vw] md:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 py-4 xs:py-6 md:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 xs:mb-10 md:mb-12 px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
            Your Personalized Feed
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-sm xs:text-base sm:text-lg max-w-xl mx-auto">
            Discover news and recommendations tailored just for you. Drag and drop to customize your feed order.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 xs:mb-8 p-3 xs:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl text-xs xs:text-sm">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="flex-shrink-0">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* News Section */}
        <section className="mb-12 xs:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-6 xs:mb-8">
            <div className="flex items-center gap-1 xs:gap-2">
              <div className="w-7 h-7 xs:w-8 xs:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Latest News
              </h2>
            </div>
            {filteredNews.length > 0 && (
              <div className="flex-1 flex justify-end">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-medium">
                  {filteredNews.length} articles
                </span>
              </div>
            )}
          </div>

          <ReorderableFeed
            articles={filteredNews}
            emptyText="Manage your preferences from the settings."
          />

          {loading && !isLoadingMore && (
            <div className="flex justify-center py-8 xs:py-12">
              <Spinner />
            </div>
          )}

          {!loading && hasMore && filteredNews.length > 0 && (
            <div className="flex justify-center mt-8 xs:mt-12">
              <button
                className="group relative inline-flex items-center gap-2 px-5 xs:px-8 py-2.5 xs:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm xs:text-base"
                onClick={loadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More News
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {!loading && !hasMore && filteredNews.length > 0 && (
            <div className="flex justify-center mt-8 xs:mt-12">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs xs:text-sm">
                <div className="w-10 xs:w-12 h-px bg-gray-400 dark:bg-gray-600"></div>
                <span className="font-medium">You've reached the end</span>
                <div className="w-10 xs:w-12 h-px bg-gray-400 dark:bg-gray-600"></div>
              </div>
            </div>
          )}
        </section>

        {/* Movies Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-6 xs:mb-8">
            <div className="flex items-center gap-1 xs:gap-2">
              <div className="w-7 h-7 xs:w-8 xs:h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Movie Recommendations
              </h2>
            </div>
            {filteredMovies.length > 0 && (
              <div className="flex-1 flex justify-end">
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-medium">
                  {filteredMovies.length} movies
                </span>
              </div>
            )}
          </div>

          <ReorderableFeed
            articles={filteredMovies}
            emptyText="No movie recommendations found."
          />
        </section>
      </div>
    </div>
  )
}
