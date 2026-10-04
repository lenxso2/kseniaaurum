'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { hero } from '@/lib/content'
import { siteConfig } from '@/lib/config'
import { easeSoft } from './motion'

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

function useCanPlayVideo() {
  const [canPlay, setCanPlay] = useState(false)
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    const slow = connection?.saveData || /2g/.test(connection?.effectiveType ?? '')
    setCanPlay(!slow)
  }, [])
  return canPlay
}

function HeroMedia() {
  const reduce = useReducedMotion()
  const canPlayVideo = useCanPlayVideo()
  const video = siteConfig.hero.video

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={video && canPlayVideo ? 'true' : undefined}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={reduce ? { scale: 1, opacity: 1 } : { scale: [1.12, 1.04, 1.08], opacity: 1 }}
        transition={
          reduce
            ? { duration: 0.6 }
            : { scale: { duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }, opacity: { duration: 1.6 } }
        }
      >
        <Image src={siteConfig.hero.poster} alt={hero.imageAlt} fill priority sizes="100vw" className="object-cover object-center" />
        {video && canPlayVideo && !reduce ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            poster={siteConfig.hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : null}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/50 to-transparent" />
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const item = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.3, ease: easeSoft, delay },
  })

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative flex min-h-svh flex-col bg-ink text-milk">
      <HeroMedia />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-16 pt-28 md:px-12 md:pb-24">
        <motion.p {...item(0.3)} className="mb-6 text-[10px] font-medium uppercase tracking-[0.36em] text-milk/85 md:text-xs">
          {hero.tagline}
        </motion.p>
        <motion.h1
          id="hero-heading"
          {...item(0.45)}
          className="font-serif text-[15vw] font-light uppercase leading-[0.88] tracking-[0.02em] md:text-[9.5vw] xl:text-[8.5rem]"
        >
          {hero.title}
        </motion.h1>
        <motion.div {...item(0.7)} className="mt-8 max-w-xl md:mt-10">
          <p className="font-serif text-2xl italic leading-snug md:text-3xl">{hero.lead}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-milk/80 md:text-base">{hero.text}</p>
        </motion.div>
        <motion.div {...item(0.9)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={hero.primaryCta.href}
            className="flex min-h-12 items-center justify-center rounded-full bg-milk px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:bg-milk-deep"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="flex min-h-12 items-center justify-center rounded-full border border-milk/50 px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-milk transition-colors hover:border-milk hover:bg-milk/10"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
