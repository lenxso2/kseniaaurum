import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { Manifesto } from '@/components/site/manifesto'
import { About } from '@/components/site/about'
import { Philosophy } from '@/components/site/philosophy'
import { Directions } from '@/components/site/directions'
import { Formats } from '@/components/site/formats'
import { Gallery } from '@/components/site/gallery'
import { FinalCta } from '@/components/site/final-cta'
import { SiteFooter } from '@/components/site/site-footer'
import { MobileCta } from '@/components/site/mobile-cta'

export default function PageEN() {
  return (
    <>
      <SiteHeader lang="en" />
      <main>
        <Hero lang="en" />
        <Manifesto lang="en" />
        <About lang="en" />
        <Philosophy lang="en" />
        <Directions lang="en" />
        <Formats lang="en" />
        <Gallery lang="en" />
        <FinalCta lang="en" />
      </main>
      <SiteFooter lang="en" />
      <MobileCta lang="en" />
    </>
  )
}
