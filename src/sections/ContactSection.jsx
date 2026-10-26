import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import EnquiryForm from '../components/forms/EnquiryForm.jsx'
import Section from '../components/layout/Section.jsx'
import { EMAILS, MAPS_URL, PHONES } from '../data/site.js'
import { useLanguage } from '../hooks/useLanguage.js'
import styles from './ContactSection.module.css'

// "Contact Us" on the home page, the target of the Contact links (#contact):
// address, phone and email beside the enquiry form (#enquiry), which every
// "Start a Test" action leads to.
//
// Business hours and an embedded map are deliberately absent: neither the
// opening hours nor the exact map location has been confirmed by the client.
export default function ContactSection({ tone }) {
  const { t, tm } = useLanguage()

  return (
    <Section id="contact" tone={tone} labelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        title={t('contact.hero.title')}
        lead={t('contact.hero.lead')}
      />

      <div className={styles.layout}>
        <section aria-labelledby="location-heading" className={styles.info}>
          <h3 id="location-heading">{t('contact.info.heading')}</h3>

          <div className={styles.item}>
            <MapPin aria-hidden="true" className={styles.icon} />
            <div>
              <h4>{t('labels.address')}</h4>
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
              <h4>{t('labels.phone')}</h4>
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
              <h4>{t('labels.email')}</h4>
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

        {/* Target of every "Start a Test" link. */}
        <section id="enquiry" aria-labelledby="enquiry-heading" className={styles.formPanel}>
          <h3 id="enquiry-heading">{t('contact.form.heading')}</h3>
          <EnquiryForm />
        </section>
      </div>
    </Section>
  )
}
