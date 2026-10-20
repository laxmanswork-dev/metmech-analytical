import { toRoman } from '../../utils/roman.js'
import styles from './Numeral.module.css'

// Small Roman-numeral label set above a heading or point: <Numeral value={2} />
// shows "II". Hidden from assistive technology, which already conveys order
// through the document outline or an ordered list, and would otherwise read
// "I" as a word.
export default function Numeral({ value, className }) {
  return (
    <span
      className={className ? `${styles.numeral} ${className}` : styles.numeral}
      aria-hidden="true"
    >
      {toRoman(value)}
    </span>
  )
}
