import { Fragment } from 'react'
import { toolkit } from '@/lib/content'
import { Section } from './section'
import { Reveal } from './motion'

export function Toolkit() {
  return (
    <Section id="toolkit" label={toolkit.label} tone="ocean">
      <Reveal>
        <h2 id="toolkit-heading" className="font-serif text-5xl font-light leading-none md:text-7xl">
          {toolkit.heading}
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col md:mt-24">
        {toolkit.groups.map((group) => (
          <Reveal key={group.title}>
            <div className="grid gap-5 border-t border-milk/15 py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-milk/70 md:col-span-3 md:pt-3">
                {group.title}
              </h3>
              <p className="font-serif text-2xl font-light leading-[1.45] md:col-span-9 md:text-4xl">
                {group.items.map((item, i) => (
                  <Fragment key={item}>
                    {i > 0 ? (
                      <span aria-hidden="true" className="mx-2.5 inline-block align-middle text-xs text-gold md:mx-3.5">
                        {'•'}
                      </span>
                    ) : null}
                    {item}
                  </Fragment>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-10 max-w-2xl border-t border-gold/40 pt-10 font-serif text-xl italic leading-relaxed text-milk/80 md:ml-[25%] md:text-2xl">
          {toolkit.note}
        </p>
      </Reveal>
    </Section>
  )
}
