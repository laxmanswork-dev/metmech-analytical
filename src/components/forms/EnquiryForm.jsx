import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { EMAILS } from '../../data/site.js'
import { useLanguage } from '../../hooks/useLanguage.js'
import { ROUTES } from '../../routes/pages.js'
import {
  buildEnquiryMailto,
  EMPTY_ENQUIRY,
  isEnquiryApiConfigured,
  submitEnquiry,
  validateEnquiry,
} from '../../utils/enquiry.js'
import Button from '../common/Button.jsx'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import styles from './Form.module.css'
import FormField from './FormField.jsx'

const fieldId = (name) => `enquiry-${name}`

// Testing enquiry form.
//
// With VITE_ENQUIRY_API_URL set, it posts the enquiry to that endpoint and
// reports the real outcome. Without it, there is nothing to submit to, so the
// form says so and hands the enquiry to the visitor's email app instead of
// showing a false success message.
export default function EnquiryForm() {
  const { t, tm, language } = useLanguage()
  const [values, setValues] = useState(EMPTY_ENQUIRY)
  const [invalidFields, setInvalidFields] = useState([])
  // idle | submitting | success | failure | emailOpened
  const [status, setStatus] = useState('idle')
  // Hidden field that people leave empty and automated form fillers do not.
  const [website, setWebsite] = useState('')

  const labels = tm('contact.form.fields')
  const errorFor = (name) =>
    invalidFields.includes(name) ? t(`contact.form.errors.${name}`) : undefined

  const setField = (name) => (value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setInvalidFields((current) => current.filter((field) => field !== name))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const invalid = validateEnquiry(values)
    setInvalidFields(invalid)
    if (invalid.length > 0) {
      setStatus('idle')
      document.getElementById(fieldId(invalid[0]))?.focus()
      return
    }

    if (!isEnquiryApiConfigured) {
      const subject = t('contact.form.emailSubject', { name: values.name.trim() })
      window.location.assign(buildEnquiryMailto(values, labels, subject))
      setStatus('emailOpened')
      return
    }

    if (website) return

    setStatus('submitting')
    try {
      await submitEnquiry(values, language)
      setValues(EMPTY_ENQUIRY)
      setStatus('success')
    } catch (error) {
      console.error('Enquiry submission failed', error)
      setStatus('failure')
    }
  }

  const isSubmitting = status === 'submitting'
  const textField = (name, props) => (
    <FormField
      id={fieldId(name)}
      label={labels[name]}
      value={values[name]}
      onChange={setField(name)}
      error={errorFor(name)}
      {...props}
    />
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.intro}>{t('contact.form.intro')}</p>

      <div className={styles.row}>
        {textField('name', { required: true, autoComplete: 'name' })}
        {textField('company', { autoComplete: 'organization' })}
      </div>
      <div className={styles.row}>
        {textField('email', { required: true, type: 'email', autoComplete: 'email' })}
        {textField('phone', { required: true, type: 'tel', autoComplete: 'tel' })}
      </div>
      {textField('requirement', {
        required: true,
        multiline: true,
        rows: 5,
        hint: labels.requirementHint,
      })}
      {textField('material', {})}
      {textField('message', { multiline: true })}

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="enquiry-website">Website</label>
        <input
          id="enquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.consent}>
          <input
            id={fieldId('consent')}
            type="checkbox"
            className={styles.checkbox}
            checked={values.consent}
            onChange={(event) => setField('consent')(event.target.checked)}
            required
            aria-invalid={errorFor('consent') ? 'true' : undefined}
            aria-describedby={errorFor('consent') ? 'enquiry-consent-error' : undefined}
          />
          <label htmlFor={fieldId('consent')}>
            {labels.consent}{' '}
            <LocalizedLink to={ROUTES.privacy}>{labels.consentLink}</LocalizedLink>.
            <span aria-hidden="true" className={styles.asterisk}>
              {' '}
              *
            </span>
          </label>
        </div>
        {errorFor('consent') && (
          <p id="enquiry-consent-error" className={styles.error}>
            {errorFor('consent')}
          </p>
        )}
      </div>

      {!isEnquiryApiConfigured && <p className={styles.hint}>{t('contact.form.emailNote')}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && (
          <LoaderCircle aria-hidden="true" size={18} className={styles.spinner} />
        )}
        {t(isSubmitting ? 'contact.form.submitting' : 'contact.form.submit')}
      </Button>

      {/* Always present so screen readers announce changes to its content. */}
      <output className={styles.statusRegion}>
        {invalidFields.length > 0 && (
          <p className={`${styles.status} ${styles.statusError}`}>
            {t('contact.form.errors.summary')}
          </p>
        )}
        {status === 'success' && (
          <p className={`${styles.status} ${styles.statusSuccess}`}>{t('contact.form.success')}</p>
        )}
        {status === 'failure' && (
          <p className={`${styles.status} ${styles.statusError}`}>{t('contact.form.failure')}</p>
        )}
        {status === 'emailOpened' && (
          <p className={`${styles.status} ${styles.statusInfo}`}>
            {t('contact.form.emailOpened', { email: EMAILS[0] })}
          </p>
        )}
      </output>
    </form>
  )
}
