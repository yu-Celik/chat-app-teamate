import { ReactNode } from 'react';
import Header from '../components/Header/Header';
import { Box, Stack } from '@mui/material';

const MainLayout = ({ children, connected }: { children: ReactNode, connected: boolean }) => {
    return (
        <Box sx={{
            height: 'fit-content',
            flexGrow: 1,
            backgroundImage: 'linear-gradient(to right, #0a3155, #172e60, #2e2966, #471d67, #5f0061)',
            minHeight: '100vh',
            minWidth: '100vw',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {connected && <Header />}
            <Stack direction={'column'} flexGrow={1} >
                {children}
            </Stack>
        </Box>
    );
};

export default MainLayout;