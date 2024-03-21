import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Suspense, useEffect } from 'react';
import LoadingPage from './pages/LoadingPage';
import Welcome from './pages/WelcomePage';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import useAuth from './contexts/Auth.Context/useAuthContext';
import { User } from './data/userData';

const App = () => {
  const { user, verifyUser } = useAuth(); // Supposons que verifyUser est la fonction de vérification

  useEffect(() => {
    console.log(user);
    verifyUser();
  }, [verifyUser, user]);


  return (
    <>
      <CssBaseline />
      <MainLayout connected={user as User}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={user ? <ChatPage /> : <Welcome />} />
            <Route path="/login" element={user ? <ChatPage /> : <LoginPage />} />
            <Route path="/register" element={user ? <ChatPage /> : <RegisterPage />} />
            <Route path='/Chat' element={user ? <ChatPage /> : <Welcome />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </>
  );
};

export default App;