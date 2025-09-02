/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import InstallPWA from '../components/InstallPWA';
import UpdateNotification from '../components/UpdateNotification';

const StyledApp = styled.div`
  // Your style here
`;

interface AppProps {
  registration?: ServiceWorkerRegistration;
}

export function App({ registration }: AppProps) {
  return (
    <StyledApp>
      <UpdateNotification registration={registration} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Dashboard</h1>
      </div>
      <InstallPWA />
    </StyledApp>
  );
}

export default App;
