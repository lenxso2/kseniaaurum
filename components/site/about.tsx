import { about } from '@/lib/content'
import { Section } from './section'
import { ParallaxImage, Reveal } from './motion'

export function About() {
  return (
    <Section id="about" label={about.label}>
      <Reveal>
        <h2
          id="about-heading"
          className="max-w-5xl text-balance font-serif text-[2.5rem] font-light uppercase leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {about.headline}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl font-serif text-xl font-light italic leading-relaxed text-ink/75 md:mt-10 md:text-2xl">
          {about.subheadline}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="relative md:sticky md:top-24">
            <Reveal>
              <ParallaxImage
                src={about.portrait.src}
                alt={about.portrait.alt}
                sizes="(min-width: 768px) 40vw, 85vw"
                className="mask-arch aspect-[3/4] w-[85%] bg-milk-deep md:w-full"
              />
            </Reveal>
            <Reveal delay={0.2} className="absolute -bottom-8 right-0 w-[42%] md:-right-10">
              <ParallaxImage
                src={about.detail.src}
                alt={about.detail.alt}
                sizes="(min-width: 768px) 16vw, 36vw"
                strength={12}
                className="mask-blob aspect-square border-[6px] border-milk bg-milk-deep"
              />
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="font-serif text-3xl italic md:text-4xl">{about.intro}</p>
          </Reveal>
          <div className="mt-10 flex max-w-lg flex-col gap-6 text-[15px] leading-relaxed text-ink/80 md:text-base">
            {about.paragraphs.map((p) => (
              <Reveal key={p}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-14 border-t border-gold/50 pt-8 font-serif text-3xl font-light leading-snug md:text-5xl">
              {about.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
