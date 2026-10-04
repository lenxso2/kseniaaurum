import { Fragment } from 'react'
import { philosophy } from '@/lib/content'
import { Section } from './section'
import { Reveal } from './motion'

export function Philosophy() {
  return (
    <Section id="philosophy" label={philosophy.label} tone="ink" innerClassName="md:py-44">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2
            id="philosophy-heading"
            className="text-balance font-serif text-[2.5rem] font-light uppercase leading-[1.04] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {philosophy.headline}
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 flex max-w-xl flex-col gap-4 text-[15px] leading-relaxed text-milk/80 md:text-base">
          {philosophy.intro.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-12 max-w-4xl font-serif text-2xl font-light italic leading-relaxed md:text-4xl">
            {philosophy.keywords.map((word, i) => (
              <Fragment key={word}>
                {i > 0 ? (
                  <span aria-hidden="true" className="mx-3 inline-block align-middle text-base not-italic text-gold">
                    {'•'}
                  </span>
                ) : null}
                <span className="whitespace-nowrap">{word}</span>
              </Fragment>
            ))}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 flex max-w-xl flex-col gap-5 text-[15px] leading-relaxed text-milk/80 md:text-base">
          {philosophy.paragraphs.map((p) =>
            p === philosophy.highlight ? (
              <Reveal key={p}>
                <p className="py-4 font-serif text-3xl italic leading-snug text-milk md:text-4xl">{p}</p>
              </Reveal>
            ) : (
              <Reveal key={p}>
                <p>{p}</p>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </Section>
  )
}
