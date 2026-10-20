import styles from './Container.module.css'

// Centres content at the site width. `narrow` is for long-form text.
export default function Container({ as: Tag = 'div', narrow = false, className = '', children }) {
  const classes = [styles.container, narrow && styles.narrow, className].filter(Boolean).join(' ')
  return <Tag className={classes}>{children}</Tag>
}
