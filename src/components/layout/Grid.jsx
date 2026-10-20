import styles from './Grid.module.css'

// Responsive grid that fits as many equal columns as the space allows and
// collapses to a single column on narrow screens without media queries.
// `min` is the smallest column width: "sm" (13rem), "md" (16rem) or "lg" (20rem).
export default function Grid({ as: Tag = 'div', min = 'md', children }) {
  return <Tag className={`${styles.grid} ${styles[min]}`}>{children}</Tag>
}
