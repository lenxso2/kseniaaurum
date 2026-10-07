import { manifesto } from '@/lib/content'
import { Section } from './section'
import { Reveal } from './motion'

export function Manifesto() {
  return (
    <Section id="manifesto" innerClassName="md:py-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 id="manifesto-heading" className="sr-only">
          Манифест
        </h2>
        {manifesto.lines.map((line) => (
          <Reveal key={line}>
            <p className="text-balance font-serif text-2xl font-light leading-snug md:text-4xl">{line}</p>
          </Reveal>
        ))}

        <ul className="mt-14 flex flex-col gap-2 md:mt-16">
          {manifesto.verbs.map((verb, i) => (
            <Reveal key={verb} delay={i * 0.08}>
              <li className="font-serif text-xl italic text-wine md:text-3xl">{verb}</li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-14 border-t border-gold/50 pt-10 text-[11px] font-medium uppercase leading-loose tracking-[0.3em] text-ink/70 md:mt-16 md:text-xs">
            {manifesto.closing.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
