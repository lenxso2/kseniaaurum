'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faq } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Section } from './section'
import { Reveal, easeSoft } from './motion'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section id="faq" label={faq.label} tone="forest">
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <h2 id="faq-heading" className="font-serif text-5xl font-light leading-none md:text-6xl">
            {faq.heading}
          </h2>
        </Reveal>
        <div className="border-t border-milk/20 md:col-span-8">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            const id = `faq-${i}`
            return (
              <div key={item.q} className="border-b border-milk/20">
                <h3>
                  <button
                    id={`${id}-button`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-11 w-full items-center justify-between gap-6 py-7 text-left font-serif text-2xl font-light leading-snug md:text-3xl"
                  >
                    {item.q}
                    <span aria-hidden="true" className="relative flex size-6 shrink-0 items-center justify-center">
                      <span className="absolute h-px w-4 bg-current" />
                      <span className={cn('absolute h-4 w-px bg-current transition-transform duration-500', isOpen && 'rotate-90 opacity-0')} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={id}
                      role="region"
                      aria-labelledby={`${id}-button`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: easeSoft }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-8 text-[15px] leading-relaxed text-milk/80 md:text-base">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
