import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchNews } from '../../utils/newsApi'
import { fetchRecommendedMovies } from '../../utils/tmdbApi'

// Async thunk for fetching personalized news with paging
export const fetchPersonalizedNews = createAsyncThunk(
  'content/fetchPersonalizedNews',
  async (
    { categories, page }: { categories: string[]; page: number },
    { rejectWithValue }
  ) => {
    try {
      const results = await Promise.all(
        categories.map(cat => fetchNews(cat, page))
      )
      return results.flat()
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch news')
    }
  }
)

// Async thunk for fetching movie recommendations (TMDB) based on genre IDs
export const fetchRecommendations = createAsyncThunk(
  'content/fetchRecommendations',
  async (
    { genreIds = [], page = 1 }: { genreIds: number[]; page: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchRecommendedMovies(genreIds, page)
      return data // array of movies
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch movies')
    }
  }
)

interface ContentState {
  news: any[]
  recommendations: any[]
  page: number
  hasMore: boolean
  loading: boolean
  error: string | null
}

const initialState: ContentState = {
  news: [],
  recommendations: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1
    },
    resetNews(state) {
      state.news = []
      state.page = 1
      state.hasMore = true
    },
    resetRecommendations(state) {
      state.recommendations = []
    },
  },
  extraReducers: builder => {
    builder
      // Personalized news handlers
      .addCase(fetchPersonalizedNews.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPersonalizedNews.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMore = false
        }
        state.news = [...state.news, ...action.payload]
        state.loading = false
      })
      .addCase(fetchPersonalizedNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to fetch news'
      })

      // Movie recommendations handlers
      .addCase(fetchRecommendations.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload
        state.loading = false
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to fetch recommendations'
      })
  }
})

export const { incrementPage, resetNews, resetRecommendations } = contentSlice.actions
export default contentSlice.reducer
