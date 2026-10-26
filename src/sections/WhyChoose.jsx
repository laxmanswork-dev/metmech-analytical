import FeatureList from '../components/common/FeatureList.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Section from '../components/layout/Section.jsx'
import { useLanguage } from '../hooks/useLanguage.js'

// "Why Choose Us?" block, shared by the home and about pages.
export default function WhyChoose({ tone = 'default' }) {
  const { t, tm } = useLanguage()

  return (
    <Section tone={tone} labelledBy="why-heading">
      <SectionHeading id="why-heading" title={t('home.why.heading')} />
      <FeatureList items={tm('home.why.items')} />
    </Section>
  )
}
