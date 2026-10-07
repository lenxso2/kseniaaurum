'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gallery, galleryCategories, type GalleryCategory, type GalleryItem } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Section } from './section'
import { easeSoft } from './motion'

const aspectClass: Record<GalleryItem['aspect'], string> = {
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
}

function InViewVideo({ item, className }: { item: GalleryItem; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={item.alt}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}

function Lightbox({ items, index, onClose, onIndex }: { items: GalleryItem[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]
  const go = (dir: number) => onIndex((index + dir + items.length) % items.length)

  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[65] flex flex-col bg-ink/95 text-milk backdrop-blur-sm"
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-6 md:px-12">
        <span className="text-[10px] tracking-[0.3em] text-milk/70">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="-mr-2 flex size-11 items-center justify-center rounded-full hover:bg-milk/10"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-10 md:px-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.src}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: easeSoft }}
            className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
          >
            {item.type === 'video' ? (
              <InViewVideo item={item} className="object-contain" />
            ) : (
              <Image src={item.src} alt={item.alt} fill sizes="100vw" className="pointer-events-none object-contain" />
            )}
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Предыдущее фото"
          className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 hover:bg-milk/10 md:left-6"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Следующее фото"
          className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 hover:bg-milk/10 md:right-6"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </motion.div>
  )
}

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const items = filter ? gallery.items.filter((item) => item.categories.includes(filter)) : gallery.items

  const chips: { value: GalleryCategory | null; label: string }[] = [
    { value: null, label: gallery.allLabel },
    ...galleryCategories.map((c) => ({ value: c, label: c })),
  ]

  return (
    <Section id="gallery" label={gallery.label} tone="ink">
      <h2 id="gallery-heading" className="sr-only">
        {gallery.heading}
      </h2>

      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Фильтр галереи">
        {chips.map((chip) => {
          const active = filter === chip.value
          return (
            <button
              key={chip.label}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(chip.value)}
              className={cn(
                'flex min-h-11 shrink-0 items-center rounded-full border px-5 text-[10px] uppercase tracking-[0.28em] transition-colors duration-500',
                active ? 'border-milk bg-milk font-semibold text-ink' : 'border-milk/25 text-milk/75 hover:border-milk/60 hover:text-milk',
              )}
            >
              {chip.label}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={filter ?? 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: easeSoft }}
          className="mt-12 columns-2 gap-3 md:mt-16 md:columns-3 md:gap-6"
        >
          {items.map((item, i) => {
            const overlap = i % 4 === 2
            return (
              <li
                key={item.src}
                className={cn(
                  'mb-3 break-inside-avoid md:mb-6',
                  overlap && 'relative z-10 -mt-12 ml-auto w-[88%] md:-mt-20',
                )}
              >
                <motion.button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Открыть: ${item.alt}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 1, ease: easeSoft, delay: (i % 3) * 0.08 }}
                  className={cn(
                    'group relative block w-full overflow-hidden bg-milk/5',
                    aspectClass[item.aspect],
                    overlap && 'ring-[6px] ring-ink md:ring-8',
                    i % 5 === 0 && 'mask-arch',
                  )}
                >
                  {item.type === 'video' ? (
                    <InViewVideo item={item} />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                    />
                  )}
                </motion.button>
              </li>
            )
          })}
        </motion.ul>
      </AnimatePresence>

      <AnimatePresence>
        {lightbox !== null ? (
          <Lightbox items={items} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} />
        ) : null}
      </AnimatePresence>
    </Section>
  )
}
