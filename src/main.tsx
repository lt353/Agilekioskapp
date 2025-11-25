
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { SERVICE_WORKER_UPDATE_INTERVAL } from "./constants/timeouts";

  createRoot(document.getElementById("root")!).render(<App />);

  // Register service worker for offline caching
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/Agilekioskapp/service-worker.js')
        .then((registration) => {
          // Check for updates periodically (every 5 minutes)
          setInterval(() => {
            registration.update();
          }, SERVICE_WORKER_UPDATE_INTERVAL);
        })
        .catch((error) => {
          console.error('[App] Service Worker registration failed:', error);
        });
    });
  }
