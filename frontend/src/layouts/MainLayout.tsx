import { ReactNode, useEffect } from 'react';
import Header from '../components/Header/Header';
import { Box, Stack } from '@mui/material';
import { User } from '../types/Auth.type/Auth.Props';
import { useLocation } from 'react-router-dom'; // Importez useLocation

const MainLayout = ({ children, connected }: { children: ReactNode, connected: User | null }) => {
    const location = useLocation();
    const isChatPage = location.pathname === '/Chat';

    useEffect(() => {
        if (isChatPage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isChatPage]);

    return (
        <Box id="mainLayout" sx={{
            flexGrow: 1,
            backgroundImage: 'linear-gradient(to right, #0a3155, #172e60, #2e2966, #471d67, #5f0061)',
            minHeight: '100vh',
            minWidth: '100vw',
            position: 'relative',
        }}>
            {connected && <Header />}
            <Stack component={'main'} direction={'column'} flexGrow={1} overflow={'hidden'}>
                {children}
            </Stack>
        </Box>
    );
};

export default MainLayout;