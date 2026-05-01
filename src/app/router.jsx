import { createHashRouter, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import LibraryPage from '../pages/LibraryPage'
import PlayerPage from '../pages/PlayerPage'
import SettingsPage from '../pages/SettingsPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/player" replace /> },
      { path: 'player', element: <PlayerPage /> },
      { path: 'library', element: <LibraryPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/player" replace /> },
    ],
  },
])
