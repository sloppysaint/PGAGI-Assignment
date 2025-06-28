'use client'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addFavoriteToDB, removeFavoriteFromDB } from '../../features/user/userSlice'

type ContentCardProps = {
  article: any
}

export default function ContentCard({ article }: ContentCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.user.favorites)

  // Find favorite DB object for this article, if it exists
  const favObj = favorites.find(fav =>
    (article.url && fav.data?.url === article.url) ||
    (article.id && fav.data?.id === article.id)
  )
  const isFavorited = !!favObj

  const handleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavoriteFromDB({ itemId: favObj.itemId, type: favObj.type }))
    } else {
      dispatch(addFavoriteToDB(article))
    }
  }

  const isMovie = article.id && !article.url
  const hasImage = article.urlToImage || article.poster_path

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {hasImage && (
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
          {article.urlToImage && (
            <img 
              src={article.urlToImage} 
              alt={article.title || "News image"} 
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          )}
          {article.poster_path && (
            <img 
              src={`https://image.tmdb.org/t/p/w500${article.poster_path}`} 
              alt={article.title || article.name || "Movie poster"} 
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              isMovie 
                ? 'bg-purple-500/90 text-white' 
                : 'bg-blue-500/90 text-white'
            }`}>
              {isMovie ? (
                <>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd"/>
                  </svg>
                  Movie
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                  </svg>
                  News
                </>
              )}
            </span>
          </div>
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white leading-tight flex-1 line-clamp-2">
            {article.title || article.name}
          </h2>
          <button
            className="flex-shrink-0 relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group/fav"
            onClick={handleFavorite}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-200 ${
              isFavorited 
                ? 'bg-red-50 dark:bg-red-900/20 scale-100' 
                : 'bg-gray-50 dark:bg-gray-700/50 scale-0 group-hover/fav:scale-100'
            }`}></div>
            <div className="relative">
              {isFavorited ? (
                <svg className="w-5 h-5 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400 group-hover/fav:text-red-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              )}
            </div>
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {article.description || article.overview}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 group/link"
            >
              Read Article
              <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          )}
          {article.id && !article.url && (
            <a
              href={`https://www.themoviedb.org/movie/${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium text-sm transition-colors duration-200 group/link"
            >
              View Details
              <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          )}
          {article.vote_average && (
            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-xs font-medium">{article.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  )
}
