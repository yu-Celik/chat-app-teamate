import { ReactNode } from 'react';
import Header from '../components/Header/Header';
import { Box, Stack } from '@mui/material';
import { User } from '../types/Auth.type/Auth.Props';

const MainLayout = ({ children, connected }: { children: ReactNode, connected: User | null }) => {
    return (
        <Box id="mainLayout" sx={{
            flexGrow: 1,
            backgroundImage: 'linear-gradient(to right, #0a3155, #172e60, #2e2966, #471d67, #5f0061)',
            minHeight: '100dvh',
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