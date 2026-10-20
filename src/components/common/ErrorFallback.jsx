import { useLanguage } from '../../hooks/useLanguage.js'
import Section from '../layout/Section.jsx'
import Button from './Button.jsx'
import styles from './ErrorFallback.module.css'

export default function ErrorFallback() {
  const { t } = useLanguage()

  return (
    <Section narrow>
      <div className={styles.content} role="alert">
        <h1>{t('error.title')}</h1>
        <p>{t('error.description')}</p>
        <Button onClick={() => window.location.reload()}>{t('error.reload')}</Button>
      </div>
    </Section>
  )
}
