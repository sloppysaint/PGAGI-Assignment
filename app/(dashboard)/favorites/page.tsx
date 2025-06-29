"use client";
import { useAppSelector } from "../../../redux/hooks";
import ContentCard from "../../../components/ContentCard/ContentCard";


export default  function FavoritesPage() {
  const favorites = useAppSelector((state) => state.user.favorites);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            Your Favorites
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Your curated collection of saved articles and movies.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <svg 
                className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Start exploring and save your favorite articles and movies to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item, idx) =>
              item.data ? (
                <ContentCard key={item.id || idx} article={item.data} />
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}