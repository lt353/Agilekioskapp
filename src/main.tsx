
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);

  // Register service worker for offline caching
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/Agilekioskapp/service-worker.js')
        .then((registration) => {
          console.log('[App] Service Worker registered successfully:', registration.scope);

          // Check for updates periodically (every 5 minutes)
          setInterval(() => {
            registration.update();
          }, 5 * 60 * 1000);
        })
        .catch((error) => {
          console.error('[App] Service Worker registration failed:', error);
        });
    });
  }
