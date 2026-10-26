import Button from '../components/common/Button.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Seo from '../components/common/Seo.jsx'
import Section from '../components/layout/Section.jsx'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import content from '../styles/content.module.css'

// Shown for unknown URLs, and for service or instrument slugs that do not exist.
export default function NotFoundPage() {
  const { t } = useLanguage()
  const title = t('notFound.title')

  return (
    <>
      <Seo title={title} description={t('notFound.description')} noindex />
      <PageHero title={title} lead={t('notFound.description')} />
      <Section narrow>
        <div className={content.block}>
          <p>{t('notFound.help')}</p>
          <div className={content.actions}>
            <Button to={ROUTES.home}>{t('actions.backHome')}</Button>
            <Button to={ROUTES.services} variant="secondary">
              {t('nav.services')}
            </Button>
            <Button to={ROUTES.contact} variant="secondary">
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
