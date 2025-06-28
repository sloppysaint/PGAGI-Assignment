"use client";
import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import ContentCard from "../ContentCard/ContentCard";

type ReorderableFeedProps = {
  articles: any[];
  emptyText?: string;
};

export default function ReorderableFeed({
  articles,
  emptyText,
}: ReorderableFeedProps) {
  const [items, setItems] = useState(articles);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setItems(articles);
  }, [articles]);

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-4 opacity-20">📰</div>
        <p className="text-center text-gray-400 text-lg font-medium">
          {emptyText || "No items to show."}
        </p>
        <p className="text-center text-gray-500 text-sm mt-2">
          Check back later for new content
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Drag indicator */}
      {isDragging && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12l-4-4h8l-4 4z"/>
            </svg>
            Reordering items...
          </span>
        </div>
      )}
      
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((article, idx) => (
          <Reorder.Item
            key={`${article.url || article.id || idx}-${idx}`}
            value={article}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-grab active:cursor-grabbing"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileDrag={{ 
              scale: 1.05, 
              rotate: 3,
              zIndex: 50,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              delay: idx * 0.05 // Staggered animation
            }}
          >
            {/* Drag handle indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-50 transition-opacity duration-200">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            {/* Content with padding */}
            <div className="relative p-6">
              <ContentCard article={article} />
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Items count indicator */}
      <div className="flex justify-center mt-6">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">{items.length}</span> item{items.length !== 1 ? 's' : ''} • Drag to reorder
        </div>
      </div>
    </div>
  );
}