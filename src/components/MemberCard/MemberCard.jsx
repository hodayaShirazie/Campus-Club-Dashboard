// MemberCard - avatar (initials), name, role badge and a small role-colored action button.
import styles from './MemberCard.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: "Leader" | "Member" | "Guest", isActive: boolean}} props.member
 * @param {boolean} props.isSelected - true when this is the selected member (the card gets styles.selected)
 * @param {(memberId: number) => void} props.onSelect - call it with member.id when the card is clicked
 */

export default function MemberCard({ member, isSelected, onSelect }) {
  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const cardClasses = [
    styles.card,
    isSelected ? styles.selected : '',
    !member.isActive ? styles.inactive : '',
  ]
    .filter(Boolean)
    .join(' ')

  const roleClass = styles[member.role.toLowerCase()]

  return (
    <div className={cardClasses} onClick={() => onSelect(member.id)}>
      <div className={styles.avatar}>{initials}</div>

      <div className={styles.info}>
        <h3 className={styles.name}>{member.name}</h3>
        <span className={styles.badge}>{member.role}</span>
      </div>

      <button
        type="button"
        className={`${styles.roleButton} ${roleClass}`}
        disabled={!member.isActive}
      >
        {member.role}
      </button>
    </div>
  )
}
