import { useLanguage } from '../../hooks/useLanguage.js'
import { ENQUIRY_PATH } from '../../routes/pages.js'
import Container from '../layout/Container.jsx'
import Button from './Button.jsx'
import styles from './CtaBand.module.css'

// Enquiry call to action. Defaults to the shared wording; pass `heading`,
// `text` and `actionLabel` to override it for a specific page, and `state`
// to pass the enquiry form what the enquiry is about (see EnquiryForm).
export default function CtaBand({ heading, text, actionLabel, state }) {
  const { t } = useLanguage()

  return (
    <section className={styles.band} aria-labelledby="cta-heading">
      <Container className={styles.inner}>
        <div>
          <h2 id="cta-heading" className={styles.heading}>
            {heading ?? t('cta.heading')}
          </h2>
          <p className={styles.text}>{text ?? t('cta.text')}</p>
        </div>
        <Button to={ENQUIRY_PATH} state={state} shape="cylinder">
          {actionLabel ?? t('actions.requestTest')}
        </Button>
      </Container>
    </section>
  )
}
