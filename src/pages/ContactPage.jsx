import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import JsonLd from '../components/common/JsonLd.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Seo from '../components/common/Seo.jsx'
import EnquiryForm from '../components/forms/EnquiryForm.jsx'
import Container from '../components/layout/Container.jsx'
import { EMAILS, MAPS_URL, PHONES } from '../data/site.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import { organizationSchema } from '../utils/structuredData.js'
import styles from './ContactPage.module.css'

// Business hours and an embedded map are deliberately absent: neither the
// opening hours nor the exact map location has been confirmed by the client.
export default function ContactPage() {
  const { t, tm } = useLanguage()

  return (
    <>
      <Seo
        title={t('contact.meta.title')}
        description={t('contact.meta.description')}
        path={ROUTES.contact}
      />
      <JsonLd data={organizationSchema()} />
      <PageHero
        title={t('contact.hero.title')}
        lead={t('contact.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.contact'), to: ROUTES.contact },
        ]}
      />

      <Container className={styles.layout}>
        <section aria-labelledby="location-heading" className={styles.info}>
          <h2 id="location-heading">{t('contact.info.heading')}</h2>

          <div className={styles.item}>
            <MapPin aria-hidden="true" className={styles.icon} />
            <div>
              <h3>{t('labels.address')}</h3>
              <address className={styles.address}>
                {tm('contact.info.addressLines').map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {t('contact.info.directions')}
                <ExternalLink aria-hidden="true" size={16} />
                <span className="visually-hidden"> ({t('a11y.opensInNewTab')})</span>
              </a>
            </div>
          </div>

          <div className={styles.item}>
            <Phone aria-hidden="true" className={styles.icon} />
            <div>
              <h3>{t('labels.phone')}</h3>
              <ul>
                {PHONES.map(({ display, tel }) => (
                  <li key={tel}>
                    <a href={`tel:${tel}`} className={styles.link}>
                      {display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.item}>
            <Mail aria-hidden="true" className={styles.icon} />
            <div>
              <h3>{t('labels.email')}</h3>
              <ul>
                {EMAILS.map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className={styles.link}>
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Target of every "Request a Test" link. */}
        <section id="enquiry" aria-labelledby="enquiry-heading" className={styles.formPanel}>
          <h2 id="enquiry-heading">{t('contact.form.heading')}</h2>
          <EnquiryForm />
        </section>
      </Container>
    </>
  )
}
