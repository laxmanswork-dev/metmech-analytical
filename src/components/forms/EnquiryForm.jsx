import { LoaderCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { useLanguage } from '../../hooks/useLanguage.js'
import { DEFAULT_LANGUAGE } from '../../i18n/config.js'
import { translate } from '../../i18n/translate.js'
import { ROUTES } from '../../routes/pages.js'
import {
  buildEnquiryMailto,
  buildEnquiryWhatsApp,
  EMPTY_ENQUIRY,
  isEnquiryApiConfigured,
  submitEnquiry,
  validateEnquiry,
} from '../../utils/enquiry.js'
import { knownRequirements, REQUIREMENT_GROUPS } from '../../utils/enquiryRules.js'
import Button from '../common/Button.jsx'
import LocalizedLink from '../navigation/LocalizedLink.jsx'
import ChoiceField from './ChoiceField.jsx'
import styles from './Form.module.css'
import FormField from './FormField.jsx'

const fieldId = (name) => `enquiry-${name}`

// A second press of Send within this time is taken as a double click, not a
// new enquiry, so WhatsApp does not open twice.
const REPEAT_GUARD_MS = 3000

// Dictionary key of the name of what an enquiry is about. A casting enquiry
// names its category, or casting work in general without one.
const aboutKey = ({ kind, slug }) => {
  if (kind === 'instrument') return `equipment.items.${slug}.name`
  if (kind === 'casting') return slug ? `casting.categories.${slug}.title` : 'casting.enquiryName'
  if (kind === 'heatTreatment') return 'nav.heatTreatment'
  return `services.items.${slug}.title`
}

// Testing enquiry form.
//
// With VITE_ENQUIRY_API_URL set, it posts the enquiry to that endpoint and
// reports the real outcome. Without it, there is nothing to submit to, so the
// form opens WhatsApp with the enquiry typed in, addressed to the company's
// number, and tells the visitor to press Send there: the enquiry only reaches
// the company if they do, so the form never claims it was sent.
//
// The enquire buttons on instrument, service, casting and heat treatment pages pass
// { enquiryAbout: { kind, slug }, from } in the link's state, so the enquiry
// names the instrument or service and the page it was started from. They may
// also pass `requirement`, a list of requirement ids to select at the start.
export default function EnquiryForm() {
  const { t, tm, language } = useLanguage()
  const { state, pathname } = useLocation()
  const about = state?.enquiryAbout ?? null
  const aboutLine = about ? t('contact.form.regarding', { name: t(aboutKey(about)) }) : null
  // One id per enquiry, kept when the visitor retries after a failure.
  const submissionId = useRef(null)
  const [values, setValues] = useState(() => ({
    ...EMPTY_ENQUIRY,
    requirement: knownRequirements(state?.requirement),
  }))
  const [invalidFields, setInvalidFields] = useState([])
  // idle | submitting | success | failure | whatsappOpened
  const [status, setStatus] = useState('idle')
  // When WhatsApp was last opened (an event time stamp), for REPEAT_GUARD_MS.
  const openedAt = useRef(-Infinity)
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
      if (event.timeStamp - openedAt.current < REPEAT_GUARD_MS) return
      openedAt.current = event.timeStamp
      // A new tab on computers; phones hand wa.me links to the WhatsApp app.
      // If the tab is blocked, open it in this one instead.
      const url = enquiryWhatsApp()
      const tab = window.open(url, '_blank')
      if (tab) tab.opener = null
      else window.location.assign(url)
      setStatus('whatsappOpened')
      return
    }

    if (website) return

    setStatus('submitting')
    submissionId.current ??= crypto.randomUUID()
    try {
      await submitEnquiry(values, language, {
        about: about ? translate(DEFAULT_LANGUAGE, aboutKey(about)) : null,
        page: state?.from ?? pathname,
        submissionId: submissionId.current,
      })
      submissionId.current = null
      setValues(EMPTY_ENQUIRY)
      setStatus('success')
    } catch (error) {
      console.error('Enquiry submission failed', error)
      setStatus('failure')
    }
  }

  const enquiryMailto = () => {
    const subject = t('contact.form.emailSubject', { name: values.name.trim() })
    return buildEnquiryMailto(values, labels, subject, aboutLine)
  }

  const enquiryWhatsApp = () =>
    buildEnquiryWhatsApp(values, about ? translate(DEFAULT_LANGUAGE, aboutKey(about)) : null)

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
      {aboutLine && <p className={styles.hint}>{aboutLine}</p>}

      <div className={styles.row}>
        {textField('name', { required: true, autoComplete: 'name' })}
        {textField('company', { autoComplete: 'organization' })}
      </div>
      <div className={styles.row}>
        {textField('email', { required: true, type: 'email', autoComplete: 'email' })}
        {textField('phone', { required: true, type: 'tel', autoComplete: 'tel' })}
      </div>
      <ChoiceField
        id={fieldId('requirement')}
        label={labels.requirement}
        hint={labels.requirementHint}
        groups={REQUIREMENT_GROUPS.map(({ id, options }) => ({
          id,
          label: labels.requirementGroups[id],
          options: options.map(([value]) => ({ value, label: labels.requirementOptions[value] })),
        }))}
        selected={values.requirement}
        onChange={setField('requirement')}
        error={errorFor('requirement')}
        required
      />
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

      {!isEnquiryApiConfigured && <p className={styles.hint}>{t('contact.form.whatsappNote')}</p>}

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
          <p className={`${styles.status} ${styles.statusError}`}>
            {t('contact.form.failure')} <a href={enquiryMailto()}>{t('contact.form.emailInstead')}</a>
          </p>
        )}
        {status === 'whatsappOpened' && (
          <p className={`${styles.status} ${styles.statusInfo}`}>
            {t('contact.form.whatsappOpened')}{' '}
            <a href={enquiryWhatsApp()} target="_blank" rel="noopener noreferrer">
              {t('contact.form.whatsappRetry')}
            </a>
          </p>
        )}
      </output>
    </form>
  )
}
