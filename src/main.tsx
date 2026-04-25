import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

if (typeof window !== 'undefined' && import.meta.env.PROD) {
  const load = (name: string) => import(/* @vite-ignore */ name);
  load('@vercel/analytics').then((m: { inject: () => void }) => m.inject()).catch(() => {});
  load('@vercel/speed-insights').then((m: { injectSpeedInsights: () => void }) => m.injectSpeedInsights()).catch(() => {});
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  const reportWebVitals = async () => {
    const { onCLS, onFID, onLCP } = await import('web-vitals');
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
  };
  reportWebVitals();
}

// Create a root with concurrent mode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);