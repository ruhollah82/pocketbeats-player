import { useEffect, useMemo, useState } from 'react'
import { tracks as demoTracks } from '../data/tracks'
import { musicPlayer } from '../lib/nativeMusicPlayer'

const fallbackColors = [
  'from-amber-300 via-orange-400 to-rose-500',
  'from-cyan-300 via-blue-500 to-indigo-600',
  'from-emerald-300 via-teal-500 to-slate-700',
  'from-fuchsia-300 via-pink-500 to-red-500',
]

const decorateTracks = (tracks) =>
  tracks.map((track, index) => ({
    ...track,
    color: track.color || fallbackColors[index % fallbackColors.length],
    album: track.album || 'Device music',
    duration: track.duration || '0:00',
  }))

const PlayerPage = () => {
  const [libraryTracks, setLibraryTracks] = useState(() => decorateTracks(demoTracks))
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isScanning, setIsScanning] = useState(musicPlayer.isNative)
  const [librarySource, setLibrarySource] = useState(musicPlayer.isNative ? 'device' : 'demo')
  const [error, setError] = useState('')
  const activeTrack = libraryTracks[activeIndex] || libraryTracks[0]

  const nextTrack = useMemo(() => {
    if (!libraryTracks.length) return null
    return libraryTracks[(activeIndex + 1) % libraryTracks.length]
  }, [activeIndex, libraryTracks])

  const scanDeviceMusic = async () => {
    if (!musicPlayer.isNative) {
      setLibrarySource('demo')
      setIsScanning(false)
      return
    }

    setError('')
    setIsScanning(true)

    try {
      const result = await musicPlayer.getLibrary()
      const scannedTracks = decorateTracks(result?.tracks || [])

      if (scannedTracks.length) {
        setLibraryTracks(scannedTracks)
        setActiveIndex(0)
        setLibrarySource('device')
      } else {
        setLibraryTracks(decorateTracks(demoTracks))
        setActiveIndex(0)
        setLibrarySource('empty')
      }
    } catch (nativeError) {
      setLibraryTracks(decorateTracks(demoTracks))
      setActiveIndex(0)
      setLibrarySource('demo')
      setError(nativeError?.message || 'Could not scan music on this device.')
    } finally {
      setIsScanning(false)
    }
  }

  useEffect(() => {
    scanDeviceMusic()
  }, [])

  const playTrack = async (index = activeIndex) => {
    const track = libraryTracks[index]
    if (!track) return

    setError('')
    setActiveIndex(index)
    setIsPlaying(true)

    try {
      await musicPlayer.play(track)
    } catch (nativeError) {
      setIsPlaying(false)
      setError(nativeError?.message || 'Playback could not start on this device.')
    }
  }

  const togglePlayback = async () => {
    setError('')

    try {
      if (isPlaying) {
        await musicPlayer.pause()
        setIsPlaying(false)
      } else {
        await playTrack(activeIndex)
      }
    } catch (nativeError) {
      setError(nativeError?.message || 'Playback controls are unavailable.')
    }
  }

  const skip = async (direction) => {
    if (!libraryTracks.length) return
    const nextIndex = (activeIndex + direction + libraryTracks.length) % libraryTracks.length
    await playTrack(nextIndex)
  }

  const sourceLabel = {
    device: `${libraryTracks.length} songs from this device`,
    empty: 'No device music found; showing demo tracks',
    demo: 'Demo playlist for browser preview',
  }[librarySource]

  if (!activeTrack) {
    return <p className="pb-28 text-slate-600">No music is available.</p>
  }

  return (
    <section className="grid gap-8 pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="rounded-[2.5rem] border border-white/20 bg-[#111827]/85 p-5 text-white shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <div className={`aspect-square rounded-[2rem] bg-gradient-to-br ${activeTrack.color} p-6 shadow-2xl`}>
          <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/25 bg-black/15 p-5 backdrop-blur-sm">
            <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
              {activeTrack.isDeviceTrack ? 'Device track' : 'Now playing'}
            </span>
            <div>
              <p className="text-sm font-medium text-white/75">{activeTrack.artist}</p>
              <h1 className="mt-2 text-5xl font-black leading-none tracking-tight sm:text-6xl">
                {activeTrack.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm text-white/55">{activeTrack.album}</p>
              <h2 className="truncate text-2xl font-bold">{activeTrack.title}</h2>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/75">{activeTrack.duration}</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className={`h-full w-2/5 rounded-full bg-gradient-to-r ${activeTrack.color}`} />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button className="control-button" type="button" onClick={() => skip(-1)} aria-label="Previous track">
              <span aria-hidden="true">‹‹</span>
            </button>
            <button
              className="h-20 w-20 rounded-full bg-white text-3xl font-black text-slate-950 shadow-xl transition active:scale-95"
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? 'Ⅱ' : '▶'}
            </button>
            <button className="control-button" type="button" onClick={() => skip(1)} aria-label="Next track">
              <span aria-hidden="true">››</span>
            </button>
          </div>

          {error ? <p className="rounded-2xl bg-red-500/15 p-3 text-sm text-red-100">{error}</p> : null}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-900/5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-600">Queue</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Next up: {nextTrack?.title || 'Nothing'}
              </h2>
            </div>
            <button
              type="button"
              onClick={scanDeviceMusic}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition active:scale-95"
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Scan'}
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">{sourceLabel}</p>
        </div>

        <div className="grid max-h-[44rem] gap-3 overflow-y-auto pr-1">
          {libraryTracks.map((track, index) => (
            <button
              key={`${track.id}-${track.url}`}
              type="button"
              onClick={() => playTrack(index)}
              className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition active:scale-[0.98] ${
                index === activeIndex
                  ? 'border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-950/20'
                  : 'border-slate-200 bg-white/80 text-slate-900 hover:border-orange-300'
              }`}
            >
              <span className={`h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br ${track.color}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{track.title}</span>
                <span className={`block truncate text-sm ${index === activeIndex ? 'text-white/60' : 'text-slate-500'}`}>
                  {track.artist} · {track.duration}
                </span>
              </span>
              <span className="text-xl">{index === activeIndex && isPlaying ? '▰▰' : '▶'}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PlayerPage
