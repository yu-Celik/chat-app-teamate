import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Suspense, lazy } from 'react';
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
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilPage = lazy(() => import('./pages/ProfilPage'));
const GamePage = lazy(() => import('./pages/GamePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


const App = () => {
  const { isAuthenticated, currentUser } = useAuth();
  useVerifyUser();

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
                <Route path="/" element={renderPageBasedOnAuth(<HomePage />, <Welcome />)} />
                <Route path="/accueil" element={renderPageBasedOnAuth(<HomePage />, <Welcome />)} />
                <Route path="/login" element={renderPageBasedOnAuth(<HomePage />, <LoginPage />)} />
                <Route path="/register" element={renderPageBasedOnAuth(<HomePage />, <RegisterPage />)} />
                <Route path='/chat' element={renderPageBasedOnAuth(<ChatPage />, <Welcome />)} />
                <Route path='/profil' element={renderPageBasedOnAuth(<ProfilPage />, <Welcome />)} />
                <Route path='/jouer' element={renderPageBasedOnAuth(<GamePage />, <Welcome />)} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </ChatProvider>
      </SocketProvider>
    </>
  );
};

export default App;