/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';

interface UpdateNotificationProps {
  registration?: ServiceWorkerRegistration;
}

const UpdateNotification = ({ registration }: UpdateNotificationProps) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (registration?.waiting) {
      setShowUpdate(true);
    }
  }, [registration]);

  const handleUpdate = async () => {
    if (registration?.waiting) {
      setIsUpdating(true);
      
      // Tell the waiting service worker to skip waiting and become active
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Listen for the controlling service worker to change
      const awaitControllerChange = () => {
        return new Promise<void>((resolve) => {
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            resolve();
          }, { once: true });
        });
      };

      await awaitControllerChange();
      
      // Reload the page to get the latest content
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  console.log("showUpdate showUpdate showUpdate", showUpdate);

//   if (!showUpdate) {
//     return null;
//   }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      right: '20px',
      backgroundColor: '#2196F3',
      color: 'white',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1001,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <div style={{ flex: 1, marginRight: '16px' }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
          🚀 Update Available
        </h3>
        <p style={{ margin: '0', fontSize: '14px', opacity: 0.9 }}>
          A new version of the app is ready
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleDismiss}
          disabled={isUpdating}
          style={{
            padding: '8px 12px',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            color: 'white',
            cursor: isUpdating ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            opacity: isUpdating ? 0.5 : 1
          }}
        >
          Later
        </button>
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: '#2196F3',
            cursor: isUpdating ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            opacity: isUpdating ? 0.5 : 1
          }}
        >
          {isUpdating ? 'Updating...' : 'Update Now'}
        </button>
      </div>
    </div>
  );
};

export default UpdateNotification;
