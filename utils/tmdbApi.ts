const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export async function fetchRecommendedMovies(genreIds: number[] = [], page = 1) {
  const genreParam = genreIds.length ? `&with_genres=${genreIds.join(',')}` : ''
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}${genreParam}&page=${page}&language=en-US&sort_by=popularity.desc`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch movies')
  const data = await res.json()
  return data.results
}
