import { NavLink, Outlet } from 'react-router-dom'

const getNavLinkClassName = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
  }`

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-lg font-semibold">Tailwind React Router</p>
            <p className="text-sm text-slate-500">Vite 8 + React 19 + React Router 7</p>
          </div>

          <nav className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
            <NavLink to="/" end className={getNavLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/about" className={getNavLinkClassName}>
              About
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
