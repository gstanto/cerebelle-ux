import { InputBar } from './components/InputBar'
import { Sidebar } from './components/Sidebar'
import { useStore } from './store'
import { TodayView } from './views/TodayView'
import { LoopsView } from './views/LoopsView'
import { PriorityView } from './views/PriorityView'
import { InboxView } from './views/InboxView'
import { DelegatedView } from './views/DelegatedView'

export default function App() {
  const tab = useStore((s) => s.activeTab)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 mx-auto w-full max-w-2xl">
          {tab === 'today' && <TodayView />}
          {tab === 'loops' && <LoopsView />}
          {tab === 'priority' && <PriorityView />}
          {tab === 'inbox' && <InboxView />}
          {tab === 'delegated' && <DelegatedView />}
        </main>
        <InputBar />
      </div>
    </div>
  )
}
