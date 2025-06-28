const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export async function fetchRecommendedMovies(page = 1) {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch movies')
  const data = await res.json()
  return data.results // array of movie objects
}
