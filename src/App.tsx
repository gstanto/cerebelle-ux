import { Header } from './components/Header'
import { InputBar } from './components/InputBar'
import { Tabs } from './components/Tabs'
import { useStore } from './store'
import { TodayView } from './views/TodayView'
import { LoopsView } from './views/LoopsView'
import { PriorityView } from './views/PriorityView'
import { InboxView } from './views/InboxView'
import { DelegatedView } from './views/DelegatedView'

export default function App() {
  const tab = useStore((s) => s.activeTab)

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
      <Header />
      <Tabs />
      <main className="flex-1">
        {tab === 'today' && <TodayView />}
        {tab === 'loops' && <LoopsView />}
        {tab === 'priority' && <PriorityView />}
        {tab === 'inbox' && <InboxView />}
        {tab === 'delegated' && <DelegatedView />}
      </main>
      <InputBar />
    </div>
  )
}
