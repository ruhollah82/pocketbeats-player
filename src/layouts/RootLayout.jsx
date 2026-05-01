import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/player', label: 'Player', icon: '♪' },
  { to: '/library', label: 'Library', icon: '▤' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

const getNavClassName = ({ isActive }) =>
  `flex flex-1 flex-col items-center justify-center gap-1 rounded-3xl px-3 py-2 text-xs font-bold transition ${
    isActive ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20' : 'text-slate-500 hover:bg-white/70 hover:text-slate-950'
  }`

const RootLayout = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f5efe4] text-slate-950">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(251,146,60,0.35),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(20,184,166,0.24),transparent_30%),linear-gradient(145deg,#fff7ed_0%,#e2e8f0_100%)]" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pb-3 pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-700">Pocket Beats</p>
          <p className="text-2xl font-black tracking-tight">Simple Android music player</p>
        </div>
        <div className="hidden rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm sm:block">
          Native audio ready
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/70 bg-white/75 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-md gap-2 rounded-[2rem] bg-slate-100/80 p-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavClassName}>
              <span className="text-xl leading-none" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default RootLayout
