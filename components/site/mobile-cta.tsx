'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ui } from '@/lib/content'
import { easeSoft } from './motion'

export function MobileCta() {
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  const [contactInView, setContactInView] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setPastHero(latest > window.innerHeight * 0.6)
  })

  useEffect(() => {
    const target = document.getElementById('contact')
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const visible = pastHero && !contactInView

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: easeSoft }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center md:hidden"
        >
          <a
            href="#contact"
            className="pointer-events-auto flex min-h-12 items-center rounded-full bg-wine px-8 text-[11px] font-medium uppercase tracking-[0.3em] text-milk shadow-[0_10px_40px_-10px_rgba(27,20,18,0.6)]"
          >
            {ui.book}
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
