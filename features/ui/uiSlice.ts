import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null as string | null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Add reducers here as you go!
  },
})

export default uiSlice.reducer
