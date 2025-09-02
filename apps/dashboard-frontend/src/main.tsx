import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Global variable to store registration for update notifications
let swRegistration: ServiceWorkerRegistration | undefined;

root.render(
  <StrictMode>
    <App registration={swRegistration} />
  </StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log('PWA: Service worker registered successfully', registration);
    swRegistration = registration;
  },
  onUpdate: (registration) => {
    console.log('PWA: New content available, please refresh', registration);
    swRegistration = registration;
    // Re-render with new registration
    root.render(
      <StrictMode>
        <App registration={registration} />
      </StrictMode>
    );
  }
});
