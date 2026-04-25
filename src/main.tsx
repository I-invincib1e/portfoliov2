import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import App from './App';
import './index.css';

if (typeof window !== 'undefined' && import.meta.env.PROD) {
  injectAnalytics();
  injectSpeedInsights();
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