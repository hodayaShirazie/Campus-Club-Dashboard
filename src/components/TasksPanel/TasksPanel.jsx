// TasksPanel - the tasks of the selected member, with messages for the empty states.
import styles from './TasksPanel.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: string, isActive: boolean} | null} props.member - the selected member, or null
 * @param {Array<{id: number, title: string, done: boolean, assignedTo: number}>} props.tasks - the tasks of the selected member
 * @param {(taskId: number) => void} props.onToggleTask - call it with task.id when a task checkbox is clicked
 */

export default function TasksPanel({ member, tasks, onToggleTask }) {
  if (!member) {
    return (
      <section className={styles.tasksPanel}>
        <p className={styles.empty}>Select a member to see their tasks</p>
      </section>
    )
  }

  return (
    <section className={styles.tasksPanel}>
      <h2 className={styles.title}>{member.name}</h2>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No tasks yet</p>
      ) : (
        <ul className={styles.tasks}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.task}>
              <label className={task.done ? styles.done : ''}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onToggleTask(task.id)}
                />
                {task.title}
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
