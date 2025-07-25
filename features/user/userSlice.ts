import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

// Thunks
export const fetchFavorites = createAsyncThunk(
  'user/fetchFavorites',
  async () => {
    const res = await fetch('/api/favorites')
    if (!res.ok) throw new Error('Failed to fetch favorites')
    return await res.json()
  }
)

export const addFavoriteToDB = createAsyncThunk(
  'user/addFavoriteToDB',
  async (article: any) => {
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: article }),
    })
    if (!res.ok) throw new Error('Failed to add favorite')
    return await res.json()
  }
)

export const removeFavoriteFromDB = createAsyncThunk(
  'user/removeFavoriteFromDB',
  async ({ itemId, type }: { itemId: string, type: string }) => {
    const res = await fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, type }),
    })
    if (!res.ok) throw new Error('Failed to remove favorite')
    return { itemId, type }
  }
)

interface UserState {
  preferences: string[]
  favorites: any[] // Each favorite: { id, itemId, type, data, createdAt }
  darkMode: boolean
  search: string
}

const initialState: UserState = {
  preferences: [],
  favorites: [],
  darkMode: false,
  search: '',       // <--- Added search here
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences(state, action: PayloadAction<string[]>) {
      state.preferences = action.payload
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {   // <-- Search
      state.search = action.payload
    },
    addFavorite(state, action: PayloadAction<any>) {
      // Optional: UI only, not used with DB persistence
    },
    removeFavorite(state, action: PayloadAction<any>) {
      // Optional: UI only, not used with DB persistence
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
      })
      .addCase(addFavoriteToDB.fulfilled, (state, action) => {
        if (!state.favorites.some(fav => fav.id === action.payload.id)) {
          state.favorites.push(action.payload)
        }
      })
      .addCase(removeFavoriteFromDB.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          fav => !(fav.itemId === action.payload.itemId && fav.type === action.payload.type)
        )
      })
  }
})

export const {
  setPreferences,
  setDarkMode,
  setSearch,
  addFavorite,
  removeFavorite,
} = userSlice.actions

export default userSlice.reducer
