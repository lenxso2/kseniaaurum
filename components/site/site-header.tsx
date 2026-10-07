'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { nav, ui } from '@/lib/content'
import { contactLinks } from '@/lib/config'
import { cn } from '@/lib/utils'
import { easeSoft } from './motion'

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(latest > previous && latest > 120)
    setSolid(latest > window.innerHeight * 0.85)
  })

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: easeSoft }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-700',
          solid ? 'border-b border-ink/10 bg-milk/85 text-ink backdrop-blur-md' : 'bg-transparent text-milk',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="#top" className="font-serif text-lg tracking-[0.28em]">
            {ui.wordmark}
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-mr-3 flex min-h-11 items-center gap-3 px-3 text-[11px] uppercase tracking-[0.3em]"
          >
            {ui.menu}
            <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 self-end bg-current" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={ui.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeSoft }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-milk"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-10 md:px-12">
              <div className="flex h-16 items-center justify-between">
                <span className="font-serif text-lg tracking-[0.28em]">{ui.wordmark}</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="-mr-3 min-h-11 px-3 text-[11px] uppercase tracking-[0.3em]"
                >
                  {ui.close}
                </button>
              </div>
              <nav aria-label="Основная навигация" className="flex-1 py-10">
                <ul className="flex flex-col gap-1">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: easeSoft, delay: 0.05 * i }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex min-h-11 items-baseline gap-4 py-1 font-serif text-3xl font-light md:text-5xl"
                      >
                        <span className="w-6 font-sans text-[10px] tracking-[0.2em] text-milk/50">
                          {String(i + 2).padStart(2, '0')}
                        </span>
                        <span className="transition-colors group-hover:text-gold">{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-milk/15 pt-6">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-[11px] uppercase tracking-[0.3em] text-milk/80 hover:text-milk"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
