import React from 'react'

// Full brand lockup shown on the admin login screen (replaces the Payload logo).
export default function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <img
        src="/srkr-logo.png"
        alt="SRKR Engineering College"
        style={{ height: 72, width: 'auto' }}
      />
      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--theme-elevation-800)' }}>
        Content Administration
      </span>
    </div>
  )
}
