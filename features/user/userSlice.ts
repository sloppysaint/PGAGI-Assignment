import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  preferences: string[]
  favorites: any[]  // array of news articles or movies
  darkMode: boolean
}

const initialState: UserState = {
  preferences: [],
  favorites: [],
  darkMode: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences(state, action: PayloadAction<string[]>) {
      state.preferences = action.payload
    },
    addFavorite(state, action: PayloadAction<any>) {
      const fav = action.payload
      // For news articles
      if (fav.url) {
        if (!state.favorites.some(item => item.url === fav.url)) {
          state.favorites.push(fav)
        }
      }
      // For movies
      else if (fav.id) {
        if (!state.favorites.some(item => item.id === fav.id)) {
          state.favorites.push(fav)
        }
      }
    },
    removeFavorite(state, action: PayloadAction<any>) {
      const fav = action.payload
      // For news articles
      if (fav.url) {
        state.favorites = state.favorites.filter(item => item.url !== fav.url)
      }
      // For movies
      else if (fav.id) {
        state.favorites = state.favorites.filter(item => item.id !== fav.id)
      }
    }
  }
})

export const { setPreferences, addFavorite, removeFavorite } = userSlice.actions
export default userSlice.reducer
