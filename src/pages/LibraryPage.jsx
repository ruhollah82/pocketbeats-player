import { tracks } from '../data/tracks'

const LibraryPage = () => (
  <section className="space-y-6 pb-28">
    <div className="rounded-[2rem] bg-white/85 p-6 shadow-xl shadow-slate-900/5">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-600">Library</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Demo tracks</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Replace these stream URLs with your own catalog, local-file picker, or backend later. The player is already wired to the Android native layer.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {tracks.map((track) => (
        <article key={track.id} className="overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-slate-900/5">
          <div className={`h-32 bg-gradient-to-br ${track.color}`} />
          <div className="p-5">
            <p className="text-sm font-semibold text-slate-500">{track.artist}</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{track.title}</h2>
            <p className="mt-3 text-sm text-slate-500">{track.album} · {track.duration}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default LibraryPage
