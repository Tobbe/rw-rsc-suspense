'use client'

import React, { Suspense } from 'react'

// @ts-expect-error no types
import styles from './Counter.module.css'
import './Counter.css'

export const MessageCounter = ({
  delayedMessage,
}: {
  delayedMessage: Promise<string>
}) => {
  const [count, setCount] = React.useState(0)

  return (
    <div style={{ border: '3px green dashed', margin: '1em', padding: '1em' }}>
      <h3 className={styles.header}>This is a client component.</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <div style={{ marginTop: '1em' }}>
        <Suspense fallback="Pending...">
          <Message count={count} delayedMessage={delayedMessage} />
        </Suspense>
      </div>
    </div>
  )
}

const Message = ({
  count,
  delayedMessage,
}: {
  count: number
  delayedMessage: Promise<string>
}) => (
  <ul>
    <li>count: {count}</li>
    <li>delayedMessage: {delayedMessage}</li>
  </ul>
)
