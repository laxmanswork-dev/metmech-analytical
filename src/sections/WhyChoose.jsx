import FeatureList from '../components/common/FeatureList.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Section from '../components/layout/Section.jsx'
import { useLanguage } from '../hooks/useLanguage.js'

// "Why Choose Us?" block, shared by the home and about pages. Each page passes
// its own `background` (from src/data/backgrounds.js); the points then sit on
// a white panel over it.
export default function WhyChoose({ tone = 'default', background }) {
  const { t, tm } = useLanguage()

  return (
    <Section tone={tone} background={background} panel labelledBy="why-heading">
      <SectionHeading id="why-heading" title={t('home.why.heading')} />
      <FeatureList items={tm('home.why.items')} numbered />
    </Section>
  )
}
