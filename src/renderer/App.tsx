import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import AuthManager from './AuthManager';
import Chat from './screens';
import Onboarding from './screens/onboarding/Onboarding';
import queryClient from './queryClient';
import PageNotFound from './screens/common/PageNotFound';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<AuthManager />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
