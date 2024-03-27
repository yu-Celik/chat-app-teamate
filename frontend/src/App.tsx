import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Suspense, lazy } from 'react';
import { CssBaseline } from '@mui/material';
import useAuth from './contexts/AuthContext/useAuthContext';
import useVerifyUser from './hooks/Auth/useVerifyUser';
import { ChatProvider } from './contexts/ChatContext/ChatContext';
import { User } from './types/Auth.type/Auth.Props';

const LoadingPage = lazy(() => import('./pages/LoadingPage'));
const Welcome = lazy(() => import('./pages/WelcomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

const App = () => {
  const { currentUser } = useAuth();
  useVerifyUser();


  const renderPageBasedOnAuth = (loggedInPage: JSX.Element, loggedOutPage: JSX.Element) => {
    return currentUser.data ? loggedInPage : loggedOutPage;
  };

  return (
    <>
      <ChatProvider currentUser={currentUser.data as User}>
        <CssBaseline />
        <MainLayout connected={currentUser.data as User}>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={renderPageBasedOnAuth(<ChatPage />, <Welcome />)} />
              <Route path="/login" element={renderPageBasedOnAuth(<ChatPage />, <LoginPage />)} />
              <Route path="/register" element={renderPageBasedOnAuth(<ChatPage />, <RegisterPage />)} />
              <Route path='/Chat' element={renderPageBasedOnAuth(<ChatPage />, <Welcome />)} />
            </Routes>
          </Suspense>
        </MainLayout>
      </ChatProvider>
    </>
  );
};

export default App;