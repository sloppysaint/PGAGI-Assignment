'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  fetchPersonalizedNews,
  incrementPage,
  resetNews
} from '../features/content/contentSlice'
import Spinner from '../components/Spinner/Spinner'
import ContentCard from '../components/ContentCard/ContentCard' // fixed import path

export default function FeedPage() {
  const dispatch = useAppDispatch()
  const preferences = useAppSelector(state => state.user.preferences)
  const { news, loading, page, hasMore, error } = useAppSelector(state => state.content)

  // Fetch fresh news when preferences change
  useEffect(() => {
    dispatch(resetNews())
    if (preferences.length) {
      dispatch(fetchPersonalizedNews({ categories: preferences, page: 1 }))
    }
  }, [preferences, dispatch])

  // Handler to load more news (pagination)
  const loadMore = () => {
    dispatch(incrementPage())
    dispatch(fetchPersonalizedNews({ categories: preferences, page: page + 1 }))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Personalized News Feed</h1>
      {/* Error message */}
      {error && (
        <p className="text-red-600 mb-2">{error}</p>
      )}

      {/* News cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article, idx) => (
          <ContentCard key={article.url || article.id || idx} article={article} />
        ))}
      </div>

      {/* Empty state */}
      {!loading && news.length === 0 && (
        <p className="text-center mt-8 text-gray-400">No news found for your preferences.</p>
      )}

      {/* Loading spinner */}
      {loading && <Spinner />}

      {/* Load more button */}
      {!loading && hasMore && news.length > 0 && (
        <button
          className="block mx-auto mt-6 px-6 py-2 bg-blue-700 text-white rounded"
          onClick={loadMore}
        >
          Load More
        </button>
      )}

      {/* No more news */}
      {!loading && !hasMore && news.length > 0 && (
        <p className="text-center mt-4 text-gray-400">No more news to load.</p>
      )}
    </div>
  )
}
