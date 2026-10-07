import { finalCta } from '@/lib/content'
import { contactLinks, siteConfig } from '@/lib/config'
import { SectionLabel } from './section'
import { ParallaxImage, Reveal } from './motion'

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative flex min-h-svh scroll-mt-0 items-center bg-ink text-milk">
      <ParallaxImage src={finalCta.image.src} alt={finalCta.image.alt} sizes="100vw" strength={5} className="!absolute inset-0" />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/50" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-28 text-center md:px-12">
        <SectionLabel className="mb-10">{finalCta.label}</SectionLabel>
        <Reveal>
          <h2
            id="contact-heading"
            className="text-balance font-serif text-[2.5rem] font-light uppercase leading-[1.04] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {finalCta.headline}
          </h2>
        </Reveal>
        <div className="mt-12 flex max-w-lg flex-col gap-4 text-[15px] leading-relaxed text-milk/85 md:text-base">
          {finalCta.paragraphs.map((p, i) => (
            <Reveal key={p} delay={i * 0.1}>
              <p className={i === finalCta.paragraphs.length - 1 ? 'font-serif text-2xl italic text-milk md:text-3xl' : undefined}>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <a
            href={siteConfig.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 flex min-h-14 items-center rounded-full bg-wine px-10 text-xs font-medium uppercase tracking-[0.3em] text-milk shadow-[0_20px_60px_-20px_rgba(110,26,31,0.9)] transition-colors hover:bg-milk hover:text-wine"
          >
            {finalCta.button}
          </a>
        </Reveal>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-8">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center border-b border-transparent text-[11px] uppercase tracking-[0.3em] text-milk/80 transition-colors hover:border-gold hover:text-milk"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
