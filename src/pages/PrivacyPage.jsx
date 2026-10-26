import PageHero from '../components/common/PageHero.jsx'
import Seo from '../components/common/Seo.jsx'
import Section from '../components/layout/Section.jsx'
import { PAGE_BACKGROUNDS, SECTION_BACKGROUNDS } from '../data/backgrounds.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import content from '../styles/content.module.css'

// The policy wording is a draft; see the note in the privacy dictionaries.
export default function PrivacyPage() {
  const { t, tm } = useLanguage()

  return (
    <>
      <Seo
        title={t('privacy.meta.title')}
        description={t('privacy.meta.description')}
        path={ROUTES.privacy}
      />
      <PageHero
        background={PAGE_BACKGROUNDS.privacy}
        title={t('privacy.hero.title')}
        lead={t('privacy.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.privacy'), to: ROUTES.privacy },
        ]}
      />

      <Section background={SECTION_BACKGROUNDS.privacy} panel narrow>
        <div className={content.stack}>
          {tm('privacy.sections').map(({ heading, paragraphs }) => (
            <div key={heading} className={content.block}>
              <h2>{heading}</h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
