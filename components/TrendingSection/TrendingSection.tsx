'use client'
import ContentCard from '../ContentCard/ContentCard'

type TrendingSectionProps = {
  title: string
  items: any[]
  limit?: number
}

export default function TrendingSection({ title, items, limit = 4 }: TrendingSectionProps) {
  const topItems = items.slice(0, limit)
  if (topItems.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topItems.map((item, idx) => (
          <ContentCard key={item.url || item.id || idx} article={item} />
        ))}
      </div>
    </section>
  )
}
