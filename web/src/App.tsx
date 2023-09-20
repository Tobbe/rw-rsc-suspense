import { Suspense } from 'react'

import { Assets } from '@redwoodjs/vite/assets'
import { ProdRwRscServerGlobal } from '@redwoodjs/vite/rwRscGlobal'

// @ts-expect-error no types
import styles from './App.module.css'
import { Counter } from './Counter'
// @ts-expect-error no types
import counterStyles from './Counter.module.css'
import { MessageCounter } from './MessageCounter'

import './App.css'

// TODO (RSC) Something like this will probably be needed
// const RwRscGlobal = import.meta.env.PROD ? ProdRwRscServerGlobal : DevRwRscServerGlobal;

globalThis.rwRscGlobal = new ProdRwRscServerGlobal()

const App = ({ name = 'Anonymous' }) => {
  const delayedMessage = new Promise<string>((resolve) => {
    setTimeout(() => resolve('Hello from server!'), 4000)
  })

  return (
    <>
      {/* TODO (RSC) <Assets /> should be part of the router later */}
      <Assets />
      <div style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}>
        <h1 className={styles.title}>Hello {name}!!</h1>
        <h3>This is a server component.</h3>
        <Suspense fallback="Pending...">
          <ServerMessage />
        </Suspense>
        <Suspense fallback={<CounterSkeleton />}>
          <ServerDelay>
            <Counter />
          </ServerDelay>
        </Suspense>
        <MessageCounter delayedMessage={delayedMessage} />
      </div>
    </>
  )
}

const ServerMessage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return <p>Hello from server!</p>
}

const ServerDelay = async ({ children }: { children: React.ReactNode }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return <>{children}</>
}

const CounterSkeleton = () => {
  return (
    <div style={{ border: '3px blue dashed', margin: '1em', padding: '1em' }}>
      <h3 className={counterStyles.header}>This is a skeleton component.</h3>
      <p>Count: {0}</p>
      <button disabled>Increment</button>
    </div>
  )
}

export default App
