import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { Manifesto } from '@/components/site/manifesto'
import { About } from '@/components/site/about'
import { Philosophy } from '@/components/site/philosophy'
import { Directions } from '@/components/site/directions'
import { Toolkit } from '@/components/site/toolkit'
import { Places } from '@/components/site/places'
import { Audience } from '@/components/site/audience'
import { Formats } from '@/components/site/formats'
import { Gallery } from '@/components/site/gallery'
import { Reviews } from '@/components/site/reviews'
import { Faq } from '@/components/site/faq'
import { FinalCta } from '@/components/site/final-cta'
import { SiteFooter } from '@/components/site/site-footer'
import { MobileCta } from '@/components/site/mobile-cta'

export default function Page() {
  return (
    <>
      <SiteHeader lang="ru" />
      <main>
        <Hero lang="ru" />
        <Manifesto lang="ru" />
        <About lang="ru" />
        <Philosophy lang="ru" />
        <Directions lang="ru" />
        <Toolkit lang="ru" />
        <Places lang="ru" />
        <Audience lang="ru" />
        <Formats lang="ru" />
        <Gallery lang="ru" />
        <Reviews lang="ru" />
        <Faq lang="ru" />
        <FinalCta lang="ru" />
      </main>
      <SiteFooter lang="ru" />
      <MobileCta lang="ru" />
    </>
  )
}
