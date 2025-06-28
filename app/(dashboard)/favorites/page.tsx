"use client";

import { useAppSelector } from "../../../redux/hooks";
import ContentCard from "../../../components/ContentCard/ContentCard";

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.user.favorites);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item, idx) =>
            item.data ? (
              <ContentCard key={item.id || idx} article={item.data} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
