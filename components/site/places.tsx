'use client'

import Image from 'next/image'
import { useRef, type RefObject } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { places, ui } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Section } from './section'
import { Reveal } from './motion'

function PlaceCard({
  place,
  index,
  container,
}: {
  place: (typeof places.items)[number]
  index: number
  container: RefObject<HTMLDivElement | null>
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollXProgress } = useScroll({ container, target: ref, axis: 'x', offset: ['start end', 'end start'] })
  const x = useTransform(scrollXProgress, [0, 1], ['-9%', '9%'])

  return (
    <figure
      ref={ref}
      className={cn('w-[68vw] max-w-[320px] shrink-0 snap-center md:w-[26vw] md:snap-start', index % 2 === 1 && 'mt-14')}
    >
      <div className="mask-arch relative aspect-[2/3] overflow-hidden bg-milk-deep">
        <motion.div style={reduce ? undefined : { x }} className="absolute inset-y-0 -inset-x-[12%]">
          <Image src={place.src} alt={place.alt} fill sizes="(min-width: 768px) 26vw, 68vw" className="object-cover" />
        </motion.div>
      </div>
      <figcaption className="mt-5 flex items-baseline gap-3">
        <span className="text-[10px] tracking-[0.2em] text-ink/50">{String(index + 1).padStart(2, '0')}</span>
        <span className="font-serif text-2xl italic">{place.name}</span>
      </figcaption>
    </figure>
  )
}

export function Places() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Section id="places" label={places.label}>
      <Reveal>
        <h2
          id="places-heading"
          className="max-w-5xl text-balance font-serif text-[2.3rem] font-light uppercase leading-[1.04] sm:text-6xl md:text-7xl"
        >
          {places.headline}
        </h2>
      </Reveal>

      <p className="mt-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink/60 md:hidden" aria-hidden="true">
        {ui.swipeHint}
        <ArrowRight className="size-3.5" />
      </p>

      <div
        ref={containerRef}
        role="region"
        aria-label={places.items.map((p) => p.name).join(', ')}
        tabIndex={0}
        className="no-scrollbar -mx-6 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:-mx-12 md:mt-16 md:gap-8 md:px-12"
      >
        {places.items.map((place, i) => (
          <PlaceCard key={place.name} place={place} index={i} container={containerRef} />
        ))}
        <span aria-hidden="true" className="w-1 shrink-0" />
      </div>

      <div className="mt-16 grid gap-6 text-[15px] leading-relaxed text-ink/80 md:mt-24 md:grid-cols-12 md:text-base">
        <div className="flex flex-col gap-6 md:col-span-5">
          {places.paragraphs.slice(0, 2).map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-col gap-6 md:col-span-5 md:col-start-8">
          {places.paragraphs.slice(2).map((p, i) => (
            <Reveal key={p}>
              <p className={i === 0 ? 'font-serif text-3xl italic leading-snug text-ink md:text-4xl' : undefined}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
