'use client'

import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { directions, type Block, type Direction } from '@/lib/content'
import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { Section } from './section'
import { Reveal, easeSoft } from './motion'

function BlockView({ block }: { block: Block }) {
  if (typeof block === 'string') return <p>{block}</p>
  return (
    <ul className="flex flex-col gap-1.5">
      {block.list.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function DirectionCard({
  item,
  index,
  open,
  onToggle,
}: {
  item: Direction
  index: number
  open: boolean
  onToggle: () => void
}) {
  const reduce = useReducedMotion()
  const teaser = typeof item.body[0] === 'string' ? item.body[0] : ''
  const panelId = `direction-${item.id}`
  const buttonId = `${panelId}-button`

  return (
    <motion.article
      layout={!reduce}
      transition={{ layout: { duration: 0.7, ease: easeSoft } }}
      className={cn('bg-milk transition-colors duration-500', open ? 'bg-milk-deep md:col-span-2' : 'hover:bg-milk-deep/60')}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start gap-5 px-1 py-8 text-left focus-visible:outline-offset-[-2px] md:px-8 md:py-10"
        >
          <span className="flex-1">
            <span className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-wine">
              <span className="text-ink/45">{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </span>
            <motion.span layout={reduce ? false : 'position'} className="mt-4 block font-serif text-3xl font-light leading-tight md:text-4xl">
              {item.title}
            </motion.span>
            <AnimatePresence initial={false}>
              {!open ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 line-clamp-2 block max-w-md text-sm leading-relaxed text-ink/65"
                >
                  {teaser}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>
          <span
            aria-hidden="true"
            className="relative mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-ink/60"
          >
            <span className="absolute h-px w-3.5 bg-current" />
            <span className={cn('absolute h-3.5 w-px bg-current transition-transform duration-500', open && 'rotate-90 opacity-0')} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: easeSoft }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 px-1 pb-10 md:grid-cols-12 md:px-8 md:pb-12">
              <div className="flex max-w-xl flex-col gap-4 text-[15px] leading-relaxed text-ink/80 md:col-span-8 md:text-base">
                {item.body.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>
              <div className="flex items-end md:col-span-4 md:justify-end">
                <a
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex min-h-12 items-center rounded-full px-7 text-[11px] font-medium uppercase tracking-[0.26em] transition-colors',
                    item.cta
                      ? 'bg-wine text-milk hover:bg-ink'
                      : 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-milk',
                  )}
                >
                  {item.cta ?? directions.defaultCta}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
}

export function Directions() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Section id="directions" label={directions.label}>
      <Reveal>
        <h2 id="directions-heading" className="font-serif text-5xl font-light leading-none md:text-7xl">
          {directions.heading}
        </h2>
      </Reveal>
      <LayoutGroup>
        <div className="mt-14 grid gap-px border-y border-ink/15 bg-ink/15 md:mt-20 md:grid-cols-2">
          {directions.items.map((item, i) => (
            <DirectionCard
              key={item.id}
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
            />
          ))}
        </div>
      </LayoutGroup>
    </Section>
  )
}
