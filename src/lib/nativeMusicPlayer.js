import { Capacitor, registerPlugin } from '@capacitor/core'

const NativeMusicPlayer = registerPlugin('NativeMusicPlayer')
let browserAudio
let browserTrack

const getBrowserAudio = () => {
  if (!browserAudio) {
    browserAudio = new Audio()
    browserAudio.preload = 'metadata'
  }
  return browserAudio
}

const runBrowserFallback = async (action, payload = {}) => {
  const audio = getBrowserAudio()

  if (action === 'play') {
    browserTrack = payload
    if (audio.src !== payload.url) audio.src = payload.url
    await audio.play()
    return { isPlaying: true, trackId: payload.id }
  }

  if (action === 'pause') {
    audio.pause()
    return { isPlaying: false, trackId: browserTrack?.id }
  }

  if (action === 'resume') {
    await audio.play()
    return { isPlaying: true, trackId: browserTrack?.id }
  }

  if (action === 'stop') {
    audio.pause()
    audio.currentTime = 0
    return { isPlaying: false, trackId: browserTrack?.id }
  }

  return { isPlaying: !audio.paused, trackId: browserTrack?.id }
}

export const musicPlayer = {
  isNative: Capacitor.isNativePlatform(),
  async getLibrary() {
    if (!Capacitor.isNativePlatform()) return { tracks: [] }
    return NativeMusicPlayer.getLibrary()
  },
  play(track) {
    if (!Capacitor.isNativePlatform()) return runBrowserFallback('play', track)
    return NativeMusicPlayer.play(track)
  },
  pause() {
    if (!Capacitor.isNativePlatform()) return runBrowserFallback('pause')
    return NativeMusicPlayer.pause()
  },
  resume() {
    if (!Capacitor.isNativePlatform()) return runBrowserFallback('resume')
    return NativeMusicPlayer.resume()
  },
  stop() {
    if (!Capacitor.isNativePlatform()) return runBrowserFallback('stop')
    return NativeMusicPlayer.stop()
  },
}
