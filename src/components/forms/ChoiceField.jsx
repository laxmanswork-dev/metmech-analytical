import { Check, Plus } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage.js'
import styles from './Form.module.css'

// A labelled group of options shown as buttons, any number of which can be
// selected. Each is a real checkbox under the button face, so it works with
// the keyboard (Tab, Space) and screen readers announce it as checked or not.
// `options` is [{ value, label }]; `selected` is the selected values. The
// first checkbox takes `id`, so an error summary can focus the field.
// Pass `groups` ([{ id, label, options }]) instead of `options` to divide the
// options under sub-headings; each group is a fieldset of its own, so a
// screen reader names the group with each option.
export default function ChoiceField({
  id,
  label,
  options,
  groups,
  selected,
  onChange,
  error,
  hint,
  required = false,
}) {
  const { t } = useLanguage()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const firstValue = (groups ? groups[0].options : options)[0]?.value

  const toggle = (value) => (event) =>
    onChange(
      event.target.checked
        ? [...selected, value]
        : selected.filter((current) => current !== value),
    )

  const choices = (list) => (
    <div className={styles.choices}>
      {list.map(({ value, label: optionLabel }) => {
        const isSelected = selected.includes(value)
        const Icon = isSelected ? Check : Plus
        return (
          <label key={value} className={styles.choice}>
            <input
              id={value === firstValue ? id : `${id}-${value}`}
              type="checkbox"
              name={id}
              value={value}
              className={styles.choiceInput}
              checked={isSelected}
              onChange={toggle(value)}
            />
            <Icon aria-hidden="true" size={16} className={styles.choiceIcon} />
            <span>{optionLabel}</span>
          </label>
        )
      })}
    </div>
  )

  return (
    <fieldset
      className={`${styles.field} ${styles.choiceField}`}
      aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
      data-invalid={error ? 'true' : undefined}
    >
      <legend className={styles.label}>
        {label}
        {required && (
          <>
            <span aria-hidden="true" className={styles.asterisk}>
              {' '}
              *
            </span>
            <span className="visually-hidden"> ({t('contact.form.required')})</span>
          </>
        )}
      </legend>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {groups
        ? groups.map((group) => (
            <fieldset key={group.id} className={styles.choiceGroup}>
              <legend className={styles.choiceGroupLabel}>{group.label}</legend>
              {choices(group.options)}
            </fieldset>
          ))
        : choices(options)}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  )
}
