import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Suspense, lazy, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import useAuth from './contexts/AuthContext/useAuthContext';
import useVerifyUser from './hooks/Auth/useVerifyUser';
import { ChatProvider } from './contexts/ChatContext/ChatContext';
import { User } from './types/Auth.type/Auth.Props';
import { SocketProvider } from './contexts/Socket/SocketContext';

const LoadingPage = lazy(() => import('./pages/LoadingPage'));
const Welcome = lazy(() => import('./pages/WelcomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

const App = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  useVerifyUser();

  useEffect(() => {
    // Obtenez le chemin actuel
    const path = window.location.pathname;
    // Si l'utilisateur est authentifié et tente d'accéder à /login ou /register, redirigez-le vers /Chat
    if (isAuthenticated && (path.toLowerCase() === '/login' || path.toLowerCase() === '/register')) {
      navigate('/chat');
    }
    // Si l'utilisateur est authentifié et se trouve sur la page d'accueil, vous pouvez choisir de le rediriger ou non
    else if (isAuthenticated && path === '/') {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const renderPageBasedOnAuth = (loggedInPage: JSX.Element, loggedOutPage: JSX.Element) => {
    return isAuthenticated ? loggedInPage : loggedOutPage;
  };

  return (
    <>
      <SocketProvider currentUser={currentUser}>
        <ChatProvider currentUser={currentUser}>
          <CssBaseline />
          <MainLayout connected={currentUser.data as User}>
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={renderPageBasedOnAuth(<ChatPage />, <Welcome />)} />
                <Route path="/login" element={renderPageBasedOnAuth(<ChatPage />, <LoginPage />)} />
                <Route path="/register" element={renderPageBasedOnAuth(<ChatPage />, <RegisterPage />)} />
                <Route path='/chat' element={renderPageBasedOnAuth(<ChatPage />, <Welcome />)} />
              </Routes>
            </Suspense>
          </MainLayout>
        </ChatProvider>
      </SocketProvider>
    </>
  );
};

export default App;