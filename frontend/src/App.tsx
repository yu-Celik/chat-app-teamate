import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Suspense } from 'react';
import LoadingPage from './pages/LoadingPage';
import Welcome from './pages/WelcomePage';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import useAuth from './contexts/Auth.Context/useAuthContext';
import { User } from './data/userData';
import { ChatContextProvider } from './contexts/Chat.Context/ChatContext';

const App = () => {
  const { currentUser, isAuthChecking } = useAuth(); // Ajoutez isAuthChecking à la déstructuration

  // Affichez un indicateur de chargement si l'authentification est en cours de vérification
  if (isAuthChecking) {
    return <LoadingPage />;
  }

  return (
    <ChatContextProvider user={currentUser as User}>
      <>
        <CssBaseline />
        <MainLayout connected={currentUser as User}>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={currentUser ? <ChatPage /> : <Welcome />} />
              <Route path="/login" element={currentUser ? <ChatPage /> : <LoginPage />} />
              <Route path="/register" element={currentUser ? <ChatPage /> : <RegisterPage />} />
              <Route path='/Chat' element={currentUser ? <ChatPage /> : <Welcome />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </>
    </ChatContextProvider>
  );
};

export default App;