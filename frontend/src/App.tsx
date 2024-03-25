import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Suspense, lazy } from 'react';
import { CssBaseline } from '@mui/material';
import useAuth from './contexts/AuthContext/useAuthContext';
import { User } from './data/userData';
import useVerifyUser from './hooks/Auth/useVerifyUser';

const LoadingPage = lazy(() => import('./pages/LoadingPage'));
const Welcome = lazy(() => import('./pages/WelcomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

const App = () => {
  const { currentUser } = useAuth();
  useVerifyUser();

  if (currentUser.isAuthChecking) {
    return <LoadingPage />;
  }

  const renderPageBasedOnAuth = (loggedInPage: JSX.Element, loggedOutPage: JSX.Element) => {
    return currentUser.data ? loggedInPage : loggedOutPage;
  };

  return (
      <>
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
      </>
  );
};

export default App;