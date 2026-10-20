import { useLanguage } from '../../hooks/useLanguage.js'
import styles from './Form.module.css'

// A labelled text input or textarea with its hint and error message wired up
// for assistive technology. `id` must be unique on the page.
export default function FormField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required = false,
  multiline = false,
  ...inputProps
}) {
  const { t } = useLanguage()
  const Control = multiline ? 'textarea' : 'input'
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className={styles.asterisk}>
              {' '}
              *
            </span>
            <span className="visually-hidden"> ({t('contact.form.required')})</span>
          </>
        ) : (
          <span className={styles.optional}> ({t('contact.form.optional')})</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <Control
        id={id}
        name={id}
        className={styles.control}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        rows={multiline ? 4 : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
