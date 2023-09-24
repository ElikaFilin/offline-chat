import { Navigate } from 'react-router-dom';

export default function AuthManager() {
  if (!localStorage.getItem('auth')) {
    return <Navigate to="/onboarding" />;
  }
  return <Navigate to="chat" />;
}
