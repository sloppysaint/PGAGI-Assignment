'use client'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addFavorite, removeFavorite } from '../../features/user/userSlice'

type ContentCardProps = {
  article: any
}

export default function ContentCard({ article }: ContentCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.user.favorites)

  // Correct favorite logic: check by url (news) or id (movie)
  const isFavorited = favorites.some(fav =>
    (article.url && fav.url === article.url) ||
    (article.id && fav.id === article.id)
  )

  const handleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorite(article))
    } else {
      dispatch(addFavorite(article))
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col relative">
      {/* For news (with image) */}
      {article.urlToImage && (
        <img src={article.urlToImage} alt="" className="w-full h-40 object-cover rounded mb-2" />
      )}
      {/* For movies (with poster_path) */}
      {article.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w300${article.poster_path}`} alt="" className="w-full h-40 object-cover rounded mb-2" />
      )}

      <button
        className="absolute top-3 right-3 text-2xl"
        onClick={handleFavorite}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorited ? '❤️' : '🤍'}
      </button>

      <h2 className="font-bold text-lg mb-1">{article.title || article.name}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{article.description || article.overview}</p>

      {/* Show Read More for news, More Info for movies */}
      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-blue-700 hover:underline"
        >
          Read More
        </a>
      )}
      {article.id && !article.url && (
        <a
          href={`https://www.themoviedb.org/movie/${article.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-blue-700 hover:underline"
        >
          More Info
        </a>
      )}
    </div>
  )
}
