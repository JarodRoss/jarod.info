import { Helmet } from 'react-helmet-async'
import PageTransition from '@/components/layout/PageTransition'
import Hero from '@/components/home/Hero'
import CurrentlyDoing from '@/components/home/CurrentlyDoing'
import AboutPreview from '@/components/home/AboutPreview'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ContactCTA from '@/components/home/ContactCTA'

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Jarod | Portfolio</title>
        <meta property="og:title" content="Jarod | Portfolio" />
        <meta property="og:description" content="Master 2 Computer Science Student. Networking, Cybersecurity, Systems & Infrastructure." />
        <meta property="og:url" content="https://jarod.info" />
      </Helmet>
      <Hero />
      <CurrentlyDoing />
      <AboutPreview />
      <FeaturedProjects />
      <ContactCTA />
    </PageTransition>
  )
}
