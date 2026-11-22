// App - keeps all the state (useState) and builds the page from the components.
import { initialMembers, initialTasks } from './data.js'
import styles from './App.module.css'

import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import FilterBar from './components/FilterBar/FilterBar.jsx'
import Notice from './components/Notice/Notice.jsx'
import MembersList from './components/MembersList/MembersList.jsx'
import TasksPanel from './components/TasksPanel/TasksPanel.jsx'

export default function App() {
  // TODO: state (useState):
  //   members          - start with initialMembers
  const [members] = useState(initialMembers)

  //   tasks            - start with initialTasks
  const [tasks, setTasks] = useState(initialTasks)

  //   selectedMemberId - start with null
  const [selectedMemberId, setSelectedMemberId] = useState(null)

  //   showOnlyActive   - start with false
  const [showOnlyActive, setShowOnlyActive] = useState(false)

  //   layout           - start with "list"
  const [layout, setLayout] = useState('list')

  // TODO: compute the members to show, the selected member and their tasks
  const visibleMembers = showOnlyActive
    ? members.filter((m) => m.isActive)
    : members
  const selectedMember = members.find((m) => m.id === selectedMemberId) || null
  const selectedMemberTasks = tasks.filter(
    (t) => t.assignedTo === selectedMemberId,
  )

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task,
    )
    setTasks(updatedTasks)
  }

  // TODO: render: Header, FilterBar, Notice (only when needed), MembersList, TasksPanel, Footer
  return (
    <div className={styles.app}>
      <Header />

      <FilterBar
        showOnlyActive={showOnlyActive}
        onToggleActive={() => setShowOnlyActive((prev) => !prev)}
        layout={layout}
        onLayoutChange={setLayout}
      />

      {selectedMember && !selectedMember.isActive && (
        <Notice type="warning">{selectedMember.name} is inactive</Notice>
      )}

      <main className={styles.content}>
        <MembersList
          members={visibleMembers}
          layout={layout}
          selectedMemberId={selectedMemberId}
          onSelect={setSelectedMemberId}
        />

        <TasksPanel
          member={selectedMember}
          tasks={selectedMemberTasks}
          onToggleTask={handleToggleTask}
        />
      </main>

      <Footer />
    </div>
  )
}
