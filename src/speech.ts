// Thin wrapper over the Web Speech API (SpeechRecognition).
// Chrome/Edge/Android Chrome ship it. Safari has it behind webkit prefix.

type Recognition = any

interface SpeechHandle {
  start: () => void
  stop: () => void
  supported: boolean
}

export function createSpeech(opts: {
  onResult: (text: string, isFinal: boolean) => void
  onEnd?: () => void
  onError?: (err: string) => void
}): SpeechHandle {
  const Ctor =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (!Ctor) {
    return {
      start: () => opts.onError?.('unsupported'),
      stop: () => {},
      supported: false,
    }
  }
  const r: Recognition = new Ctor()
  r.continuous = true
  r.interimResults = true
  r.lang = 'en-US'

  r.onresult = (e: any) => {
    let interim = ''
    let final = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i]
      if (res.isFinal) final += res[0].transcript
      else interim += res[0].transcript
    }
    if (final) opts.onResult(final, true)
    else if (interim) opts.onResult(interim, false)
  }
  r.onend = () => opts.onEnd?.()
  r.onerror = (e: any) => opts.onError?.(e.error || 'error')

  return {
    start: () => {
      try {
        r.start()
      } catch {
        /* already started */
      }
    },
    stop: () => {
      try {
        r.stop()
      } catch {
        /* noop */
      }
    },
    supported: true,
  }
}
