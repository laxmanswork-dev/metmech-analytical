import FeatureList from '../components/common/FeatureList.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Section from '../components/layout/Section.jsx'
import { useLanguage } from '../hooks/useLanguage.js'

// "Why Choose Us?" block, shared by the home and about pages.
export default function WhyChoose() {
  const { t, tm } = useLanguage()

  return (
    <Section labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        title={t('home.why.heading')}
        lead={t('home.why.lead')}
      />
      <FeatureList items={tm('home.why.items')} />
    </Section>
  )
}
