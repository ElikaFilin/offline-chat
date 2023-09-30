import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import AuthManager from './AuthManager';
import ChatScreen from './screens/chat/Chat';
import OnboardingScreen from './screens/onboarding/Onboarding';
import queryClient from './queryClient';
import PageNotFound from './screens/common/PageNotFound';
import chatKey from './screens/chat/constants';
import { ElectronStoreProvider } from './hooks/ElectronStoreContext';

export default function App() {
  window.electron.store.set(chatKey, []); // init chats store

  return (
    <QueryClientProvider client={queryClient}>
      <ElectronStoreProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<AuthManager />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ElectronStoreProvider>
    </QueryClientProvider>
  );
}
