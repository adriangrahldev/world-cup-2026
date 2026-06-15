import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

// Remove the splash loader as soon as the app has mounted.
function dismissSplash() {
  const splash = document.getElementById('splash')
  if (!splash) return
  // Wait for the first frame so the user briefly sees the app before the splash fades
  requestAnimationFrame(() => {
    requestAnimationFrame(() => splash.classList.add('hidden'))
  })
  // Remove from DOM after the transition finishes so it doesn't trap focus
  setTimeout(() => splash.parentNode?.removeChild(splash), 600)
}

if (document.readyState === 'complete') {
  dismissSplash()
} else {
  window.addEventListener('load', dismissSplash, { once: true })
}

// Register service worker (production only)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available — you could show a toast here
            }
          });
        });
      })
      .catch((err) => {
        console.warn('SW registration failed', err);
      });
  });
}
