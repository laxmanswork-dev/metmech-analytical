import { useLanguage } from '../../hooks/useLanguage.js'
import styles from './SpecTable.module.css'

// Instrument specifications as label/value pairs. `specs` is
// [{ label, value }] where `label` is a key in `equipment.specLabels` and a
// null `value` is shown as "Awaiting confirmation".
export default function SpecTable({ specs }) {
  const { t } = useLanguage()

  return (
    <dl className={styles.table}>
      {specs.map(({ label, value }) => (
        <div key={label} className={styles.row}>
          <dt>{t(`equipment.specLabels.${label}`)}</dt>
          <dd className={value === null ? styles.pending : undefined}>
            {value ?? t('equipment.labels.awaiting')}
          </dd>
        </div>
      ))}
    </dl>
  )
}
