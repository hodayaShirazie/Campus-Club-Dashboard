// Footer - small, centered gray text.
// Renders a <footer> with the text: © 2025 Campus Coding Club
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© 2025 Campus Coding Club</p>
    </footer>
  )
}
