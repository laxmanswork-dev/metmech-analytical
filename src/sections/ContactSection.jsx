import { Mail, MapPin, Navigation, Phone } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import EnquiryForm from '../components/forms/EnquiryForm.jsx'
import Section from '../components/layout/Section.jsx'
import { EMAILS, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, PHONES } from '../data/site.js'
import { useLanguage } from '../hooks/useLanguage.js'
import styles from './ContactSection.module.css'

// "Contact Us" on the home page, the target of the Contact links (#contact):
// the address, phone numbers and email addresses, a map of the laboratory
// with directions, and the enquiry form (#enquiry), which every "Start a
// Test" action leads to.
//
// Business hours are deliberately absent: they have not been confirmed by
// the client. The map's location is explained in src/data/site.js.
export default function ContactSection() {
  const { t, tm } = useLanguage()

  return (
    <Section id="contact" labelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        title={t('contact.hero.title')}
        lead={t('contact.hero.lead')}
      />

      <div className={styles.layout}>
        <div className={styles.info}>
          <section aria-labelledby="details-heading" className={styles.card}>
            <h3 id="details-heading" className={styles.cardHeading}>
              {t('contact.info.detailsHeading')}
            </h3>

            <div className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                <MapPin size={20} strokeWidth={1.75} />
              </span>
              <div className={styles.itemBody}>
                <h4 className={styles.label}>{t('labels.address')}</h4>
                <address className={styles.address}>
                  {tm('contact.info.addressLines').map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                <Phone size={20} strokeWidth={1.75} />
              </span>
              <div className={styles.itemBody}>
                <h4 className={styles.label}>{t('labels.phone')}</h4>
                <ul className={styles.links}>
                  {PHONES.map(({ display, tel }) => (
                    <li key={tel}>
                      <a href={`tel:${tel}`} className={`${styles.link} ${styles.phone}`}>
                        {display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                <Mail size={20} strokeWidth={1.75} />
              </span>
              <div className={styles.itemBody}>
                <h4 className={styles.label}>{t('labels.email')}</h4>
                <ul className={styles.links}>
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

          <section aria-labelledby="location-heading" className={styles.mapCard}>
            <h3 id="location-heading" className={styles.cardHeading}>
              {t('contact.info.mapHeading')}
            </h3>
            <div className={styles.map}>
              <iframe
                src={MAPS_EMBED_URL}
                title={t('contact.info.mapTitle')}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className={styles.mapFooter}>
              <p className={styles.mapArea}>
                <MapPin aria-hidden="true" size={16} strokeWidth={1.75} />
                {t('contact.info.mapArea')}
              </p>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directions}
              >
                <Navigation aria-hidden="true" size={16} strokeWidth={1.75} />
                {t('contact.info.getDirections')}
                <span className="visually-hidden"> ({t('a11y.opensInNewTab')})</span>
              </a>
            </div>
          </section>
        </div>

        {/* Target of every "Start a Test" link. */}
        <section id="enquiry" aria-labelledby="enquiry-heading" className={styles.formPanel}>
          <div className={styles.formHead}>
            <h3 id="enquiry-heading" className={styles.formHeading}>
              {t('contact.form.heading')}
            </h3>
            <p className={styles.formLead}>{t('contact.form.lead')}</p>
          </div>
          <EnquiryForm />
        </section>
      </div>
    </Section>
  )
}
