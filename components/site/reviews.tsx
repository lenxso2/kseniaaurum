'use client'

import { useRef, useState } from 'react'
import { reviews } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Section } from './section'
import { Reveal } from './motion'

export function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  const step = () => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return 1
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    return first.offsetWidth + gap
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    setActive(Math.min(reviews.items.length - 1, Math.round(track.scrollLeft / step())))
  }

  const scrollTo = (i: number) => {
    trackRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' })
  }

  return (
    <Section id="reviews" label={reviews.label}>
      <Reveal>
        <h2
          id="reviews-heading"
          className="max-w-4xl text-balance font-serif text-[2.3rem] font-light uppercase leading-[1.04] sm:text-6xl md:text-7xl"
        >
          {reviews.headline}
        </h2>
      </Reveal>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        aria-label={reviews.headline}
        tabIndex={0}
        className="no-scrollbar -mx-6 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 md:-mx-12 md:mt-20 md:gap-6 md:scroll-px-12 md:px-12"
      >
        {reviews.items.map((review, i) => (
          <li
            key={review.name}
            aria-label={`${i + 1} / ${reviews.items.length}`}
            className="flex w-[84%] shrink-0 snap-start flex-col justify-between bg-milk-deep p-7 sm:w-[60%] md:w-[42%] md:p-12 lg:w-[36%]"
          >
            <blockquote>
              <span aria-hidden="true" className="block font-serif text-6xl leading-none text-gold">
                {'“'}
              </span>
              <p className="-mt-2 font-serif text-xl italic leading-relaxed md:text-2xl">{review.quote}</p>
            </blockquote>
            <footer className="mt-10 border-t border-ink/15 pt-5">
              <p className="font-serif text-xl">{review.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.26em] text-ink/60">{review.practice}</p>
            </footer>
          </li>
        ))}
        <li aria-hidden="true" className="w-px shrink-0" />
      </ul>

      <div className="mt-8 flex items-center gap-1" role="group" aria-label="Навигация по отзывам">
        {reviews.items.map((review, i) => (
          <button
            key={review.name}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Отзыв ${i + 1}`}
            aria-current={active === i}
            className="flex size-11 items-center justify-center"
          >
            <span
              className={cn(
                'block h-px transition-all duration-500',
                active === i ? 'w-8 bg-ink' : 'w-4 bg-ink/30',
              )}
            />
          </button>
        ))}
      </div>
    </Section>
  )
}
