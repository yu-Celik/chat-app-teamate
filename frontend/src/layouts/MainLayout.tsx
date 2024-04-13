import { ReactNode } from 'react';
import Header from '../components/Header/Header';
import { Stack, useMediaQuery } from '@mui/material';
import { User } from '../types/Auth.type/Auth.Props';
import LabelBottomNavigation from '../components/BottomNavigation/BottomNavigation';
import customTheme from '../styles/customTheme';

// import LabelBottomNavigation from '../components/BottomNavigation/BottomNavigation';

const MainLayout = ({ children, connected }: { children: ReactNode, connected: User | null }) => {

    const isSmDown = useMediaQuery(customTheme.breakpoints.down('sm'));

    return (
        <Stack id="mainLayout" minHeight={'100dvh'} position={'relative'} sx={{
            backgroundImage: 'linear-gradient(to right, #0a3155, #172e60, #2e2966, #471d67, #5f0061)',
        }}>
            {connected && <Header />}
            <Stack component={'main'} direction={'column'} flexGrow={1} overflow={'hidden'} >
                {children}
            </Stack>
            {isSmDown && <LabelBottomNavigation />}
        </Stack>
    );
};

export default MainLayout;