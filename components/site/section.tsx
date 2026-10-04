import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const tones = {
  milk: 'bg-milk text-ink',
  ink: 'bg-ink text-milk',
  ocean: 'bg-ocean text-milk',
  forest: 'bg-forest text-milk',
} as const

export type Tone = keyof typeof tones

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] opacity-80', className)}>
      <span aria-hidden="true" className="h-px w-8 bg-gold" />
      {children}
    </p>
  )
}

export function Section({
  id,
  label,
  tone = 'milk',
  className,
  innerClassName,
  children,
}: {
  id: string
  label?: string
  tone?: Tone
  className?: string
  innerClassName?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn('relative scroll-mt-16', tones[tone], className)}>
      <div className={cn('mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-36', innerClassName)}>
        {label ? <SectionLabel className="mb-10 md:mb-14">{label}</SectionLabel> : null}
        {children}
      </div>
    </section>
  )
}
