// FeedPage.test.tsx

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import FeedPage from './page'


const mockStore = configureStore([])

describe('FeedPage Integration', () => {
  it('shows empty state when no news', () => {
    const store = mockStore({
      user: { preferences: [], search: '' },
      content: { news: [], loading: false, page: 1, hasMore: false, error: null, recommendations: [] },
    })

    render(
      <Provider store={store}>
        <FeedPage />
      </Provider>
    )

    // The text should match your actual empty state message
    expect(screen.getByText(/Manage your preferences/i)).toBeInTheDocument()
  })
})
