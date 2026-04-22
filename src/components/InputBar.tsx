import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Mic, MicOff } from 'lucide-react'
import clsx from 'clsx'
import { useStore } from '../store'
import { createSpeech } from '../speech'

export function InputBar() {
  const addLoop = useStore((s) => s.addLoop)
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const speechRef = useRef<ReturnType<typeof createSpeech> | null>(null)
  const baseTextRef = useRef('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    speechRef.current = createSpeech({
      onResult: (t, isFinal) => {
        const combined = (baseTextRef.current + ' ' + t).trim()
        setText(combined)
        if (isFinal) baseTextRef.current = combined
      },
      onEnd: () => setListening(false),
      onError: (err) => {
        setListening(false)
        if (err === 'unsupported') setVoiceSupported(false)
      },
    })
    setVoiceSupported(speechRef.current.supported)
  }, [])

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }, [text])

  const submit = (viaVoice = false) => {
    const value = text.trim()
    if (!value) return
    addLoop(value, undefined, viaVoice)
    setText('')
    baseTextRef.current = ''
  }

  const toggleMic = () => {
    if (!speechRef.current) return
    if (listening) {
      speechRef.current.stop()
      setListening(false)
    } else {
      baseTextRef.current = text
      speechRef.current.start()
      setListening(true)
    }
  }

  return (
    <div className="pointer-events-none sticky bottom-0 left-0 right-0 z-10">
      <div className="h-10 bg-gradient-to-t from-ink-0 to-transparent" />
      <div className="pointer-events-auto bg-ink-0/80 backdrop-blur-xl border-t border-ink-3 px-3 pt-2 pb-[max(env(safe-area-inset-bottom,0.5rem),0.5rem)]">
        <div
          className={clsx(
            'flex items-end gap-2 rounded-2xl border bg-ink-1 p-2 transition',
            listening
              ? 'border-punk/60 shadow-punk-ring'
              : 'border-ink-3 focus-within:border-punk/50 focus-within:shadow-punk-ring',
          )}
        >
          <button
            onClick={toggleMic}
            disabled={!voiceSupported}
            aria-label={listening ? 'Stop listening' : 'Start voice input'}
            className={clsx(
              'shrink-0 grid place-items-center h-10 w-10 rounded-xl transition',
              !voiceSupported && 'opacity-40',
              listening
                ? 'bg-punk text-white animate-mic-pulse'
                : 'bg-ink-2 text-fog-muted hover:text-fog hover:bg-ink-3',
            )}
          >
            {listening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit(listening)
              }
            }}
            placeholder={listening ? 'listening…' : 'capture an idea, a task, a thought…'}
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-2 text-[15px] leading-snug placeholder:text-fog-dim text-fog focus:outline-none"
          />

          <button
            onClick={() => submit(listening)}
            disabled={!text.trim()}
            aria-label="Add to cerebelle"
            className={clsx(
              'shrink-0 grid place-items-center h-10 w-10 rounded-xl transition',
              text.trim()
                ? 'bg-punk text-white shadow-punk-glow hover:bg-punk-soft'
                : 'bg-ink-2 text-fog-dim',
            )}
          >
            <ArrowUp size={18} />
          </button>
        </div>
        <div className="mt-1.5 px-2 flex items-center justify-between text-[10.5px] text-fog-dim font-mono">
          <span>{listening ? 'hold the thought — stop when you\'re done' : 'enter to capture · shift+enter for newline'}</span>
          <span className="opacity-70">→ notion</span>
        </div>
      </div>
    </div>
  )
}
