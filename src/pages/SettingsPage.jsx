const SettingsPage = () => (
  <section className="space-y-5 pb-28">
    <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">Settings</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Pocket Beats</h1>
      <p className="mt-3 text-white/65">App id: com.pocketbeats.player</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {[
        ['Native audio', 'Android MediaPlayer service handles background playback.'],
        ['Notification', 'Foreground notification includes pause and resume actions.'],
        ['Navigation keys', 'Hash routing and safe-area spacing keep Android back/nav behavior stable.'],
        ['Offline ready', 'Swap the demo URLs for bundled or device audio files when needed.'],
      ].map(([title, description]) => (
        <div key={title} className="rounded-3xl border border-slate-200 bg-white/85 p-5">
          <h2 className="text-xl font-black text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      ))}
    </div>
  </section>
)

export default SettingsPage
