'use client'
import { Provider } from 'react-redux'
import { SessionProvider, useSession } from "next-auth/react"
import { store } from '../redux/store'
import { useAppDispatch } from "../redux/hooks"
import { fetchFavorites } from "../features/user/userSlice"
import { useEffect } from "react"

function FetchFavoritesOnAuth() {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchFavorites());
    }
  }, [status, dispatch]);

  return null; // This component doesn't render anything
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <FetchFavoritesOnAuth />
        {children}
      </Provider>
    </SessionProvider>
  )
}
