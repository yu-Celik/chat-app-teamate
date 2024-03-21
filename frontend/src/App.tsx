import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Suspense } from 'react';
import LoadingPage from './pages/LoadingPage';
import Welcome from './pages/WelcomePage';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';


const App = () => {

  const connected = false;
  return (
    <>
      <CssBaseline />
      <MainLayout connected={connected}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={connected ? <ChatPage /> : <Welcome />} />
            <Route path="/login" element={connected ? <ChatPage /> : <LoginPage />} />
            <Route path="/register" element={connected ? <ChatPage /> : <RegisterPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </>
  );
};

export default App;