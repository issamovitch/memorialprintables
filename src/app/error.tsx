'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '12px',
        textAlign: 'center',
        padding: '0 28px',
      }}
    >
      <div style={{ fontSize: '64px', fontWeight: 800, color: 'var(--accent-soft)', lineHeight: 1 }}>
        !
      </div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink)' }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--slate)', maxWidth: '400px', lineHeight: 1.6 }}>
        An unexpected error occurred. This has been logged — please try again.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '8px',
          background: 'var(--accent)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '10px',
          fontSize: '15px',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'inherit',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
