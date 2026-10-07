'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { audience } from '@/lib/content'
import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { SectionLabel } from './section'
import { easeSoft } from './motion'

const toneClass = {
  wine: 'bg-wine',
  forest: 'bg-forest',
  terracotta: 'bg-terracotta',
} as const

export function Audience() {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  return (
    <section id="audience" aria-labelledby="audience-heading" className="scroll-mt-16 bg-milk text-milk">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-24 text-ink md:px-12 md:pb-20 md:pt-36">
        <SectionLabel className="mb-10 md:mb-14">{audience.label}</SectionLabel>
        <h2 id="audience-heading" className="font-serif text-5xl font-light leading-none md:text-7xl">
          {audience.heading}
        </h2>
      </div>

      {audience.items.map((item, i) => {
        const isOpen = !!open[item.id]
        const panelId = `audience-${item.id}`
        return (
          <article key={item.id} className={cn('relative overflow-hidden', toneClass[item.tone])}>
            <div
              aria-hidden="true"
              className="mask-blob pointer-events-none absolute -right-24 -top-24 size-[70vw] max-h-[640px] max-w-[640px] bg-milk/[0.04]"
            />
            <div className="relative mx-auto max-w-7xl px-6 md:px-12">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen((s) => ({ ...s, [item.id]: !s[item.id] }))}
                  className="group flex min-h-[62svh] w-full flex-col justify-between py-10 text-left focus-visible:outline-offset-[-6px] md:min-h-[72vh] md:py-14"
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-milk/70">
                      {String(i + 1).padStart(2, '0')} / {String(audience.items.length).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative flex size-12 items-center justify-center rounded-full border border-milk/40 transition-colors group-hover:border-milk"
                    >
                      <span className="absolute h-px w-4 bg-milk" />
                      <span className={cn('absolute h-4 w-px bg-milk transition-transform duration-500', isOpen && 'rotate-90 opacity-0')} />
                    </span>
                  </span>
                  <span className="block font-serif text-[17vw] font-light leading-[0.85] tracking-[0.02em] transition-transform duration-700 group-hover:translate-x-2 md:text-[12vw] xl:text-[11rem]">
                    {item.title}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={item.title}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: easeSoft }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 border-t border-milk/25 pb-14 pt-10 md:grid-cols-12 md:pb-20">
                      <p className="font-serif text-2xl font-light leading-snug md:col-span-7 md:text-4xl">{item.text}</p>
                      <div className="flex flex-col gap-8 md:col-span-4 md:col-start-9">
                        <p className="text-[11px] uppercase leading-loose tracking-[0.28em] text-milk/80">
                          {item.keywords.join(' • ')}
                        </p>
                        <a
                          href={siteConfig.links.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-12 w-fit items-center rounded-full bg-milk px-7 text-[11px] font-medium uppercase tracking-[0.26em] text-ink transition-colors hover:bg-milk-deep"
                        >
                          {audience.cta}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </article>
        )
      })}
    </section>
  )
}
