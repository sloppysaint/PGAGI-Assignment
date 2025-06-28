export async function fetchNews(category: string, page = 1) {
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
  const url = `https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&language=en&pageSize=10&page=${page}&apiKey=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch news')
  const data = await res.json()
  return data.articles
}
