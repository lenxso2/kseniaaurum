'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formats } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Section } from './section'
import { Reveal, easeSoft } from './motion'

const modes = ['online', 'offline'] as const
type Mode = (typeof modes)[number]

export function Formats() {
  const [mode, setMode] = useState<Mode>('online')
  const tabRefs = useRef<Record<Mode, HTMLButtonElement | null>>({ online: null, offline: null })
  const list = formats[mode]

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next: Mode = mode === 'online' ? 'offline' : 'online'
    setMode(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="formats" label={formats.label}>
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 id="formats-heading" className="font-serif text-5xl font-light leading-none md:text-7xl">
            {formats.heading}
          </h2>
        </Reveal>

        <div
          role="tablist"
          aria-label={formats.heading}
          onKeyDown={onKeyDown}
          className="relative flex w-full rounded-full border border-ink/25 p-1 sm:w-fit"
        >
          {modes.map((m) => {
            const selected = mode === m
            return (
              <button
                key={m}
                ref={(el) => {
                  tabRefs.current[m] = el
                }}
                type="button"
                role="tab"
                id={`formats-tab-${m}`}
                aria-selected={selected}
                aria-controls="formats-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setMode(m)}
                className={cn(
                  'relative flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full px-8 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 sm:flex-none',
                  selected ? 'font-semibold text-milk' : 'font-medium text-ink/65 hover:text-ink',
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="formats-pill"
                    transition={{ duration: 0.6, ease: easeSoft }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn('relative size-1.5 rounded-full border border-current', selected && 'bg-gold border-gold')}
                />
                <span className="relative">{formats[m].title}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        id="formats-panel"
        role="tabpanel"
        aria-labelledby={`formats-tab-${mode}`}
        className="mt-14 min-h-[32rem] md:mt-20 md:min-h-[26rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ol
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: easeSoft }}
            className="grid border-t border-ink/15 md:grid-cols-2 md:gap-x-16"
          >
            {list.items.map((item, i) => (
              <li key={item} className="flex items-baseline gap-5 border-b border-ink/15 py-4 md:py-5">
                <span className="w-6 text-[10px] tracking-[0.2em] text-ink/50">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-2xl font-light md:text-4xl">{item}</span>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </Section>
  )
}
